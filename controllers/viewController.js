const Place = require("../models/placeModel");

exports.getContent = async (req, res, next) => {
  try {
    const places = await Place.find();

    res.status(200).render("content", {
      title: "All places",
      places,
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.getPlace = async (req, res, next) => {
  try {
    const place = await Place.findOne({ _id: req.params.placeId }).populate({
      path: "reviews",
      fields: "review rating person",
    });
    res.status(200).render("place", {
      title: `${place.name}`,
      place,
    });
  } catch (err) {
    console.error(err.message);
  }
};
