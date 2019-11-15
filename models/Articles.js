
// Bring in mongoose
const mongoose = require("mongoose");
// Layout model
const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    summary: {
      type: String,
      require: true
    },
    body: {
      type: String,
      require: true
    },
    slug: {
      type: String,
      required: true
    }
  }
);
// Create the User and format of schema in one for export
const Articles = mongoose.model("final", articleSchema);
module.exports = Articles;