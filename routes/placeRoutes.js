const express = require("express");
const placeController = require("../controllers/placeController");
const reviewRouter = require("../routes/reviewRoutes");
const userRouter = require("../routes/userRoutes");

const router = express.Router();

router.use("/:placeId/reviews", reviewRouter);

router
  .route("/")
  .get(placeController.getAllPlaces)
  .post(placeController.createPlace);
router
  .route("/:id")
  .get(placeController.getPlace)
  .patch(placeController.updatePlace)
  .delete(placeController.deletePlace);

module.exports = router;
