const User = require("../models/userModel");
const factory = require("./handlerFactory");

exports.setReviewId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.review) req.body.review = req.params.reviewId;
  next();
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
