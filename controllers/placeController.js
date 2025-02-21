const Place = require("../models/placeModel");
const factory = require("./handlerFactory");

exports.getAllPlaces = factory.getAll(Place);
exports.getPlace = factory.getOne(Place, { path: "reviews" });
exports.createPlace = factory.createOne(Place);
exports.updatePlace = factory.updateOne(Place);
exports.deletePlace = factory.deleteOne(Place);
