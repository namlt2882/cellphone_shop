import mongodb, { ObjectId } from "mongodb";
import { MONGODB_URL } from "../config";

var MongoClient = mongodb.MongoClient;
var database;

function db(collectionName, callback) {
  var onConnected = () => {
    var dbo = database.db("cellphoneshop");
    var collection = dbo.collection(collectionName);
    callback(collection, database);
  };
  if (database) {
    if (database.isConnected()) {
      onConnected();
      return;
    } else {
      database = null;
    }
  }
  MongoClient.connect(MONGODB_URL, (err, db) => {
    if (err) throw err;
    database = db;
    onConnected();
  });
}

function insert(collectionName, object, callback) {
  db(collectionName, (collection, db) => {
    collection.insertOne(object, callback);
  });
}

function get(collectionName, id, query) {
  query = Object.assign({ _id: id }, query);
  return new Promise((resolve, reject) => {
    db(collectionName, collection => {
      collection.find(query).toArray((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  });
}

function normalize(obj) {
  if (typeof obj._id == "string") {
    obj._id = ObjectId(obj._id);
  }
}

export default { db, insert, normalize, get };
