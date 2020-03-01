import express from "express";
import repository from "../repository/repository";
import User from "../dto/user";

var router = express.Router();

router.post("/register", (req, res, next) => {
  let body = req.body;
  insert(transfer(body))
    .then(user => {
      res.status(201).end(JSON.stringify(user));
    })
    .catch(e => {
      res.status(500).end(e);
    });
});

router.post("/login", (req, res, next) => {
  let body = req.body;
  getByUsernameAndPassword(transfer(body))
    .then(user => {
      if (user) {
        var accessObject = {
          role: user.role,
          token: "abcxyz"
        };
        res.status(200).end(JSON.stringify(accessObject));
      } else {
        res.status(401).end("Unauthorized");
      }
    })
    .catch(e => {
      res.status(500).end(e);
    });
});

function getByUsernameAndPassword(user) {
  return new Promise((resolve, reject) => {
    repository.db("user", collection => {
      collection
        .find({ username: user.username, password: user.password })
        .toArray((err, result) => {
          if (err) {
            reject(err);
          }
          if (result && result.length > 0) {
            resolve(transfer(result[0]));
          } else {
            resolve(null);
          }
        });
    });
  });
}

function getByUsername(username) {
  return new Promise((resolve, reject) => {
    repository.db("user", collection => {
      collection.find({ username: username }).toArray((err, result) => {
        if (err) {
          reject(err);
        }
        if (result && result.length > 0) {
          resolve(transfer(result[0]));
        } else {
          resolve(null);
        }
      });
    });
  });
}

function insert(newUser) {
  newUser.role = "customer";
  return new Promise((resolve, reject) => {
    getByUsername(newUser.username)
      .then(existingUser => {
        if (existingUser) {
          reject(`The username ${existingUser.username} is already existed!`);
        }
        repository.insert("user", newUser, (err, result) => {
          if (err) reject(err);
          resolve(transfer(result.ops[0]));
        });
      })
      .catch(e => reject(e));
  });
}

function transfer(obj) {
  let user = new User();
  Object.assign(user, obj);
  repository.normalize(user);
  return user;
}

export {
  router as usersRouter,
  insert,
  getByUsername,
  getByUsernameAndPassword,
  transfer
};
