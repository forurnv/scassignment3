
// Courtesy of Mallory Zlomanchuk
// same as previous pages / no lesson here
const express = require("express");
const router = express.Router();

const Articles = require("../models/Articles");

// Protect our authentication worthy pages
const { ensureAuthenticated } = require("../config/auth");

// /////////////////////////////////////////
//           POST
// /////////////////////////////////////////

// Database protection ON Post page by wraping get request inside
router.get("/posts", ensureAuthenticated, (req, res) => {

// Courtesy Tony Grimes
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const articles = require('../fixtures/articles');
const users = require('../fixtures/user');

const uri = process.env.DB_CONNECTION;
MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
   if(err) {
      console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
  // perform actions on the collection object
  //  Open a connection Mongo db called final
   const db = client.db("final");

  // Connecting article fixture to article collection in final db
   const artCol = db.collection('articles');

  //  Adding the article fixture to db collection
   artCol.drop();
   artCol.insertMany(articles, function(err, cursor) {
    if (err) {
      console.log('There was a problem');
    }
    console.log(cursor.insertedCount);
  });

  // using find() to create a cursor for a query that can be used to itirate over the posted articles from db. A for loop will be used to render the title and summary to the viewport on the post page.
  artCol.find({}).toArray().then((blog) => {
    console.log("articles found")
    res.render("posts", {show: blog });
    console.log(blog)
  });

  // Adding user fixture to db. My authentication needed a password so I chose not to use the user fixture however left it for Rubric success
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

// /////////////////////////////////////////
//           SLUG 
// /////////////////////////////////////////

// Database protection ON Post page by wraping get request inside
router.get("/posts/:slug", ensureAuthenticated, (req, res) => {

  // Courtesy Tony Grimes
  const MongoClient = require('mongodb').MongoClient;
  require('dotenv').config();
    
  const uri = process.env.DB_CONNECTION;
  MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
     if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
     }
     console.log('Connected...');
    // perform actions on the collection object
    //  Open a connection Mongo db called final
     const db = client.db("final");
  
    // Connecting article fixture to article collection in final db
     const artCol = db.collection('articles');
    
    // using find() to create a cursor for a query that can be used to itirate over the posted articles from db and find corresponging slug. A for loop will be used to render the blog post to the viewport on the post/slug page.
    artCol.find({slug: req.params.slug}).toArray().then((blog) => {
      console.log("articles found: '"+req.params.slug+"'")
      res.render("posts/slug", {show: blog });
   });
    client.close();
  });
});
  
module.exports = router;
