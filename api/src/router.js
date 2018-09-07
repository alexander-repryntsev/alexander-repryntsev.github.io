import path from 'path';
import _ from 'lodash';
import File from './models/file';
import Post from './models/post';

import {ObjectID} from 'mongodb';
import FileArchiver from './archiver';

class AppRouter {
constructor(app) {
    this.app = app;
    this.setupRouters();
}

setupRouters() {
    const app = this.app;
    const db = app.get('db');
    const uploadDir = app.get('storageDir');
    const upload = app.get('upload');
    app.get('/', (req, res, next) => {
        return res.status(200).json({
            version: 'works'
        });
    });
    
    // Upload routing
    app.post('/', upload.array('files'), (req, res, next) => {
       const files = _.get(req, 'files', []);
       let fileModels = [];

       _.each(files, (fileObject) => {

           const newFile = new File(app).initWithObject(fileObject).toJSON();
           fileModels.push(newFile);
        });
        
       if(fileModels.length) {
        db.collection('files').insertMany(fileModels, (err, result) => {
            if(err) {
                return res.status(503).json({
                    error: {
                        message: 'Unable saved your files',
                    }
                })
            }
            let post = new Post(app).initWithObject({
                files: result.insertedIds
            }).toJSON();

            //let save post object to posts collection.

            db.collection('posts').insertOne(post, (err, result) => {
                if(err) {
                    return res.status(503).json({error: {message: "Your upload could not be saved"}});
                }
                return res.json(post);
            })

            
        })
       }
       else {
            return res.status(503).json({
                error: {message: 'Files upload is required'}
            });
       }
    });

    // Dowload routing
  /* app.get('/:id', (req, res, next) => {
        const fileId = req.params.id;
        
        console.log("fileId",fileId);
        db.collection('files').find({_id: ObjectID(fileId)}).toArray((err, result) => {
            const fileName = _.get(result, '[0].name');
            if(err || !fileName) {
                return res.status(404).json({
                    error: {
                        message: 'File not found'
                    }
                })
            }
            const filePath = path.join(uploadDir, fileName);
            
            return res.download(filePath, fileName, (err) => {
                if(err) {
                    return res.status(404).json({
                        error: {
                            message: 'File not found'
                        }
                    });
                }
                else {
                    console.log("File is downloaded");
                }
            })
        })
    });*/
    
    // Routing for post details/api/posts/:id

    app.get('/api/posts/:id', (req, res, next) => {
        const postId = _.get(req, 'params.id');
        this.getPostById(postId, (err, result) => {
            if(err) {
                return res.status(404).json({error: {message: "File not found"}})
            }
            return res.json(result);
        });
    })
     // Routing download zip files

     app.get('/api/posts/:id/download', (req, res, next) => {
       const id = _.get(req, 'params.id', null);
       this.getPostById(id, (err, result) => {
           if(err) {
               return res.status(404).json({error:{message: "File not found."}})
            }
            const files = _.get(result, 'files', []);
            const archiver = new FileArchiver(app, files, res).download();
            console.log("tyt", archiver);
           return archiver;
       })
    })
    
}
getPostById(id, callback = () => {}) {
    const app = this.app;
    const db = app.get('db');

    let postObjectId = null;
    try {
        postObjectId = new ObjectID(id);
    }
    catch (err) {
        return callback(err, null);
    }
    db.collection('posts').find({_id: postObjectId}).limit(1).toArray((err, results) => {
       
        let result = _.get(results, '[0]');

        if(err || !result) {
            return callback(err ? err : new Error("File not found."));
        }

        const fileIds = _.get(result, 'files', []);

        db.collection('files').find({_id: {$in: Object.values(fileIds)}}).toArray((err, files)=> {
        console.log("fileIds", files, err)
            
            if(err || !files || !files.length) {
                return callback(err ? err : new Error("File not found."));
            }

            result.files = files;

            return callback(null, result);
        })
    })
}
}

export default AppRouter;