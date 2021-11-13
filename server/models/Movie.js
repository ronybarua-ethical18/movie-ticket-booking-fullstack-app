const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    year: String,
    genre: String,
    duration: String,
    limit: String,
    isSeries: { type: String, default: "false" },
    img: String,
    trailer: String,
    comments: [
      {
        body: String,
        username: String,
        createdAt: String,
      },
    ],
    likes: [
      {
        username: String,
        createdAt: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
