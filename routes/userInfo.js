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

   
      console.log(sess.username);

      dbo.collection('usuarios').findOne({username:sess.username}, (err, result) => {
        if (err) throw err;
        res.send({ resultado: result.username } );
        db.close();
        console.log('Database was closed!');
      });
    
    

    
  });
});

module.exports = router;
