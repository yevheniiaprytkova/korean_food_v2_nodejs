const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.setReviewId, userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
