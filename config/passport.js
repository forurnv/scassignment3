
// FOR INFORMATION ON WHAT A STRATEGY IS I CHOSE TO READ THE DOCUMENTS
// FROM OUR SOURCE OF AUTHORITY, PASSPORTJS THEMSESLVES. FOR FURTHER 
// INFO SEE "http://www.passportjs.org/docs/".
// I chose localStrategy because I wanted to use it's special .use method.
const LocalStrategy = require("passport-local").Strategy;
// We need our database to confirm/verification
const mongoose = require("mongoose");
// Now that weve got bcrypt, we need it here (at least).
const bcrypt = require("bcryptjs");

// Load User model that includes the schema from user.js line 24.
const User = require("../models/User");
// export the Strategy were creating and pass the passport Object
// through/from the app.js file

module.exports = function(passport) {
  // Passing in the passport to our new strategy.
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user to email in db (could be by name or other objects)
      // use mongoose like used in validation (dont forget promise handling)
      User.findOne ({ email: email }) 
        .then(user => {
           if (!user) {
          return done(null, false, { message: "That Email Is Not Yet Subscribed!!" });
        }
        // Match password using bcrypts compare method on our db with boolean.
        bcrypt.compare(password, user.password, (err, isMatch) => {
          // error handling
          if (err) throw err;
          // error handling for is matched or else
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password Incorrect" });
          }
        });
      })
      .catch(err => console.log(err));
    })
  );
// I've learned that at the end of every strategy a coder should have a
// way to serialize and unserialize or encrypt or decrypt. Most freqently 
// the methods are found in the documents of our Source. in 
// this case "http://www.passportjs.org/docs/"

// Passport will serialize and deserialize user instances
// to and from the session.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};