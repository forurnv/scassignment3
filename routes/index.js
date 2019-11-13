
// same as previous pages / no lesson here
const express = require("express");
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
  name: req.user.name
}));

module.exports = router;

