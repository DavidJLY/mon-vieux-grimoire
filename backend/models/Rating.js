const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  userId: { type: String, require: true },
  grade: { type: Number, require: true },
});

module.exports = ratingSchema;
