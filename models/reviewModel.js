const mongoose = require("mongoose");
const Place = require("../models/placeModel");
const User = require("../models/userModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    place: {
      type: mongoose.Schema.ObjectId,
      ref: "Place",
    },
    user: {
      type: String,
    },
    person: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.virtual("users", {
  ref: "User",
  foreignField: "userName",
  localField: "person",
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "users",
    select: "userName userImage",
  });
  next();
});

reviewSchema.pre(/^create/, function (next) {
  this.populate({
    path: "users",
    select: "userName userImage",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (placeId) {
  const stats = await this.aggregate([
    {
      $match: { place: placeId },
    },
    {
      $group: {
        _id: "$place",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Place.findByIdAndUpdate(placeId, {
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Place.findByIdAndUpdate(placeId, {
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post("save", async function () {
  //this points to current review
  //this.constructor points to current module
  await this.constructor.calcAverageRatings(this.place);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  console.log(this.r);
  console.log(this.r.constructor);
  await this.r.constructor.calcAverageRatings(this.r.place);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
