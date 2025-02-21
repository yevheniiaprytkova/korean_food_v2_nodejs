const express = require("express");
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/userController");

const userRouter = require("../routes/userRoutes");

const router = express.Router({ mergeParams: true });

router.use("/:reviewId/users", userRouter);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(reviewController.setPlaceId, reviewController.createReview)
  .get(userController.getAllUsers)
  .post(userController.setReviewId, userController.createUser);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
