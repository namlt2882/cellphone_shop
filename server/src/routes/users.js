import express from 'express'
import repository from "../repository/repository";

var router = express.Router();

router.post("/register", function(req, res, next) {
  let body = req.body;

  repository.insert("user", newObj, (err, result) => {
    if (err) throw err;
    res.status(201).end(JSON.stringify(result.ops[0]));
  });
});

export default router
