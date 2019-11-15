
// bring in expresss,layouts,mongoose,flash,session,passport
const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//////////////////////////////////////////////////
              //  CONNECTION
///////////////////////////////////////////////////
// basic express server
const app = express();


// bring in congig/passport
require ("./config/passport")(passport);

// Bring in Path
const path = require('path');

// Invoke dotenv
require("dotenv").config();

// DB Config
const db = process.env.DB_CONNECTION;

// MONGO Connection 
// (usenewurlparser:true to avoid the error causing default. 
// (node:93839) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, 
// and will be removed in a future version. To use the new Server Discover and Monitoring engine, 
// pass option { useUnifiedTopology: true } to the MongoClient constructor.
// // see "https://mongoosejs.com/docs/deprecations.html")
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
// or option 2 from the website although it worked from the 
// first line, [mongoose.createConnection(db, { useNewUrlParser: true })]
.then(() => console.log("MongoDatabase Connected..."))
.catch(err => console.log(err));

//////////////////////////////////////////////////
//  MIDDLEWARE
//////////////////////////////////////////////////

// EJS (layouts must be above the set method below it)
app.use(expresslayouts);
app.set(`view engine`, `ejs`);

// Express body parser 
// Another Deprecation Warning: from what I read its because express does/didnt
// have a body parser. see link below
// "https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4"
// now we can get info from our form with request.body
app.use(express.urlencoded({ extended: false }));

// Express session courtesy of "https://github.com/expressjs/session/blob/master/README.md"
// "sessions" suggested by Linden our tutor after going over the assignment
// Also, for more on where secrets have to match for this npm 
// package to work see "https://www.npmjs.com/package/express-session"
app.use(session({
  secret: "secret",
  resave: true,
  // For avoiding more deprecation warnings:
  saveUninitialized: true,
}));

// passport middleware from "passportjs.org" to start and track a session
app.use(passport.initialize());
app.use(passport.session());

// Connect flash (envoke)
app.use(flash());

// Set global variables for creating sessions with the use of flash 
app.use((req, res, next) => {
  // give the res.locals the value required by flash 
  // so we can call on them for verification
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  // dont forget next() in middleware for the execution stacks
  next();
});


// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// Route static assets
app.use(express.static(path.join(__dirname, "assets")));

// create a port to run our app on
const PORT = process.env.PORT || 3000;

// use app object called Listen 
app.listen(PORT, console.log(`server started on port ${PORT}`));



