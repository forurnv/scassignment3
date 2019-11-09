

// same as previous pages / no lesson here
const express = require("express");
const router = express.Router();

// GET and SEND/RENDER a msg for testing
// router.get("/", (req, res) => res.send ("welcome to the homepage"));
router.get("/", (req, res) => res.render ("welcome"));

module.exports = router;

