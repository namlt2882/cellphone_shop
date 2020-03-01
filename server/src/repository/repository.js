import mongodb from 'mongodb'

var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";
var database;

function db(collectionName, callback) {
    var onConnected = () => {
        var dbo = database.db('cellphone_shop')
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
    MongoClient.connect(url, (err, db) => {
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

module.exports = { db, insert };