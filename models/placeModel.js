const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    ratingInternet: {
      type: String,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (val) => Math.round(val * 10) / 10,
    },
    urlLocation: {
      type: String,
    },
    location: {
      type: String,
    },
    distance: {
      type: String,
    },
    openHours: {
      type: String,
    },
    urlPlace: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

placeSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "place",
  localField: "_id",
});

placeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reviews",
    select: "review rating person",
  });
  next();
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
