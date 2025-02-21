const mongoose = require("mongoose");
const Review = require("../models/reviewModel");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    userImage: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
