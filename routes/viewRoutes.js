const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/", viewController.getContent);
router.get("/places/:placeId/reviews", viewController.getPlace);
module.exports = router;
