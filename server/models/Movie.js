const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    img: String ,
    imgTitle: String,
    trailer: String,
    video: String,
    year: String,
    limit: Number,
    genre: String,
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);