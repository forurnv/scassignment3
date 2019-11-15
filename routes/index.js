
// same as previous pages / no lesson here
const express = require("express");
const moment = require("moment");
const router = express.Router();

// Protect our authentication worthy pages
const { ensureAuthenticated } = require("../config/auth");


// Welcome Page
// GET and SEND/RENDER a msg for testing
// router.get("/", (req, res) => res.send ("welcome to the homepage"));
router.get("/", (req, res) => res.render ("welcome"));

// Dashboard Page
router.get("/dashboard", ensureAuthenticated, (req, res) => 
res.render ("dashboard", {
  name: req.user.name,
  rawdate: req.user.date,
  regdate: moment(req.user.date).format("MMMM Do YYYY, h:mm:ss a"),
// momentjs.com/docs for reference to how we learned to use moments
  nowdate: moment().format("MMMM Do YYYY, h:mm:ss a")
}));

//Unauthenticated link to dashboard for styling devs
router.get("/dashboard", (req, res) => 
res.render ("dashboard", {
  name: req.user
}));

module.exports = router;

