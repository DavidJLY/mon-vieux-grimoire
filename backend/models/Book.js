const mongoose = require("mongoose");
const ratingSchema = require("./Rating");

const bookSchema = mongoose.Schema({
  title: { type: String, require: true },
  author: { type: String, require: true },
  imageUrl: { type: String, require: true },
  year: { type: Number, require: true },
  genre: { type: String, require: true },
  userId: { type: String, require: true },
  ratings: [ratingSchema],
  averageRating: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("Book", bookSchema);
