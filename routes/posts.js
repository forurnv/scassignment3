

// same as previous pages / no lesson here
const express = require("express");
const router = express.Router();

// Protect our authentication worthy pages
const { ensureAuthenticated } = require("../config/auth");

const Articles = require("../models/Articles")

// Database protection ON Post page by wraping get request inside
router.get("/posts", ensureAuthenticated, (req, res) => {

// from tonay
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const articles = require('./fixtures/articles');
const users = require('./fixtures/users');

const uri = process.env.DB_CONNECTION;
MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
   if(err) {
      console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   // perform actions on the collection object

   const db = client.db("final-project");

   const artCol = db.collection('articles');

   artCol.drop();
   artCol.insertMany(articles, function(err, cursor) {
    if (err) {
      console.log('There was a problem');
    }
    console.log(cursor.insertedCount);
  });

  const userCol = db.collection('users');

  userCol.drop();
  userCol.insertMany(users, function(err, cursor) {
   if (err) {
     console.log('There was a problem');
   }
   console.log(cursor.insertedCount);
 });

  client.close();
});
})





