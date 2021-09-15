var express = require('express');
const { response } = require('../app');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

/* GET home page. */
router.post('/', function (req, res, next) {

  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("test");

    dbo.collection('usuarios').insertOne(req.body, (err, result) => {
      if (err) throw err;
      console.log(result.name);
      res.send({ resultado: "Usuario Creado!" });
      db.close();
      console.log('Database was closed!');
    });
  });
});

module.exports = router;
