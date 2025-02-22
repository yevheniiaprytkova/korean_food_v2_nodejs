const Review = require("../models/reviewModel");
const factory = require("./handlerFactory");

exports.setPlaceId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.place) req.body.place = req.params.placeId;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
