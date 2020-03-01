import mongodb from 'mongodb'
import { MONGODB_URL } from '../config'

var MongoClient = mongodb.MongoClient;
var database;

function db(collectionName, callback) {
    var onConnected = () => {
        var dbo = database.db('cellphoneshop')
        var collection = dbo.collection(collectionName);
        callback(collection, database)
    }
    if (database) {
        if (database.isConnected()) {
            onConnected();
            return
        } else {
            database = null
        }
    }
    MongoClient.connect(MONGODB_URL, (err, db) => {
        if (err) throw err
        database = db;
        onConnected();
    });
}

function insert(collectionName, object, callback) {
    db(collectionName, (collection, db) => {
        collection.insertOne(object, callback);
    })
}

export default { db, insert };