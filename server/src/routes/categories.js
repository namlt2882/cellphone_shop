import express from "express";
import repository from "../repository/repository";
import Category from "../dto/category";

var router = express.Router();

router.get("/", (req, res, next) => {
  getAll()
    .then(categories => {
      res.status(200).end(JSON.stringify(categories));
    })
    .catch(err => {
      res.status(500).end(JSON.stringify(err));
    });
});

router.post("/", (req, res, next) => {
  var body = req.body;
  insert(transfer(body))
    .then(category => {
      res.status(201).end(JSON.stringify(category));
    })
    .catch(err => {
      res.status(500).end(JSON.stringify(err));
    });
});

function count() {
  return new Promise((resolve, reject) => {
    repository.db("category", collection => {
      try {
        let result = collection.count({ status: "active" });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
}

function insert(category) {
  return new Promise((resolve, reject) => {
    count().then(quantity => {
      category.order = quantity + 1;
      repository.insert("category", category, (err, result) => {
        if (err) reject(err);
        resolve(transfer(result.ops[0]));
      });
    }).catch(e => reject(e));
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    repository.db("category", collection => {
      collection
        .find({ status: "active" })
        .sort({ order: 1 })
        .toArray((err, result) => {
          if (err) {
            reject(err);
          }
          let categories = result.map(val => transfer(val));
          resolve(categories);
        });
    });
  });
}

function transfer(obj) {
  let category = new Category();
  return Object.assign(category, obj);
}

export default router;
