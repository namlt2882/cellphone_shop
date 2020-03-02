import express from "express";
import repository from "../repository/repository";
import Product from "../dto/product";
import { ObjectId } from "mongodb";
import * as categoriesRepo from "./categories";

var router = express.Router();

router.get("/", (req, res, next) => {
  var categoryId = req.query.categoryId
  getByCategory(categoryId)
    .then(categories => {
      res.status(200).end(JSON.stringify(categories));
    })
    .catch(err => {
      res.status(500).end(JSON.stringify(err));
    });
});

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  get(ObjectId(id))
    .then(product => {
      res.status(200).end(JSON.stringify(product));
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

function countByCategory(categoryId) {
  return new Promise((resolve, reject) => {
    repository.db("product", collection => {
      try {
        let result = collection.count({
          status: "active",
          categoryId: categoryId
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
}

function insert(product) {
  product.status = "active";
  product.insertedDate = new Date();
  return new Promise((resolve, reject) => {
    let categoryId = product.categoryId;
    var doInsert = () => {
      repository.insert("product", product, (err, result) => {
        if (err) reject(err);
        resolve(transfer(result.ops[0]));
      });
    };
    if (categoryId) {
      categoriesRepo
        .get(ObjectId(categoryId))
        .then(cat => {
          if (cat) {
            doInsert();
          } else {
            reject(`The category with id ${categoryId} is not existed!`);
          }
        })
        .catch(e => reject(e));
    } else {
      doInsert();
    }
  });
}

function getByCategory(categoryId) {
  return new Promise((resolve, reject) => {
    repository.db("product", collection => {
      collection
        .find({ status: "active", categoryId: categoryId })
        .sort({ insertedDate: -1 })
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
  let product = new Product();
  Object.assign(product, obj);
  if (typeof obj.insertedDate != 'object') {
    product.insertedDate = Date.parse(obj.insertedDate);
  }
  repository.normalize(product);
  return product;
}

function get(id) {
  return new Promise((resolve, reject) => {
    repository
      .get("product", id, { status: "active" })
      .then(result => {
        if (result.length > 0) {
          resolve(transfer(result[0]));
        } else {
          resolve(null);
        }
      })
      .catch(e => reject(e));
  });
}

export { router as productsRouter, insert, getByCategory, countByCategory, get };
