var express = require('express');
const { response } = require('../app');
var router = express.Router();



const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

let sess;

/* GET home page. */
router.post('/', function (req, res, next) {
  sess=req.session;

  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("test");

    dbo.collection('usuarios').findOne({username: req.body.username}, (err, result) => {
      if (err) throw err;
      if(result.password == req.body.password)
      {
        res.send({ resultado: "Logged!"});
        sess.username=result.username;
        console.log(sess.username);
      }
      else
      {
        res.send({ resultado: "Username or password error!"});
      }
      db.close();
      console.log('Database was closed!');
    });
  });
});

module.exports = router;
