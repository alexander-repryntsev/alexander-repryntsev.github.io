import {MongoClient} from 'mongodb';
const url = 'mongodb://localhost:27017/fileup';
const dbName = 'massplaceholder';

export const connect = (callback) => {
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        return callback(err, db);
      });
}

