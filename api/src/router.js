import path from 'path';
import _ from 'lodash';
import File from './models/file';
import Post from './models/post';

import {ObjectID} from 'mongodb';

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
        console.log("fileModels", files);

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
            console.log("user", req.body, result);
            let post = new Post(app).initWithObject({
                files: result.insertedIds
            });

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
    app.get('/:id', (req, res, next) => {
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
    });
     // Routing download zip files
     app.get('/:id/download', (req, res, next) => {
        return res.json({
            hi: 'here'
        });
    })
}
}

export default AppRouter;