
// bring in expresss/layouts/mongoose
const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// basic express server
const app = express();

// DB Config
const db = require("./config/keys").MongoURI;

// MONGO Connection 
// (usenewurlparser:true to avoid the error causing default. 
// (node:93839) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, 
// and will be removed in a future version. To use the new Server Discover and Monitoring engine, 
// pass option { useUnifiedTopology: true } to the MongoClient constructor.
// // see "https://mongoosejs.com/docs/deprecations.html")
mongoose.connect(db, { useUnifiedTopology: true })
// or option 2 from the website although it worked from the 
// first line, [mongoose.createConnection(db, { useNewUrlParser: true })]
  .then(() => console.log("MongoDatabase Connected..."))
  .catch (err => console.log(err));

// EJS (layouts must be above the set method below it)
app.use(expresslayouts);
app.set(`view engine`, `ejs`);

// Express body parser 
// Another Deprecation Warning: from what I read its because express does/didnt
// have a body parser. see link below
// "https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4"
// now we can get info from our form with request.body
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require(`./routes/index`));
app.use("/users", require(`./routes/users`));

// create a port to run our app on
const PORT = process.env.PORT || 3000;

// use app object called Listen 
app.listen(PORT, console.log(`server started on port ${PORT}`));


