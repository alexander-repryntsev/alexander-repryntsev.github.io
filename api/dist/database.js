'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = undefined;

var _mongodb = require('mongodb');

var url = 'mongodb://localhost:27017/fileup';
var dbName = 'massplaceholder';

var connect = exports.connect = function connect(callback) {
    _mongodb.MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);
        return callback(err, db);
    });
};
//# sourceMappingURL=database.js.map