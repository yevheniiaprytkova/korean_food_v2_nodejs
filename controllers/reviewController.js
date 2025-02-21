const Review = require("../models/reviewModel");
const factory = require("./handlerFactory");
// const multer = require("multer");
// const sharp = require("sharp");
// const catchAsync = require("../utils/catchAsync");

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image! Please upload only images", 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// exports.uploadReviewImages = upload.fields([
//   { name: "imgYevheniia", maxCount: 1 },
//   { name: "imgEugen", maxCount: 1 },
// ]);

// exports.resizeReviewImages = catchAsync(async (req, res, next) => {
//   if (!req.files.imgYevheniia || !req.files.imgEugen) {
//     return next();
//   }

//   // req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.imgYevheniia[0].buffer)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/imgYevheniia.jpeg`);

//   // 2) Images
//   // req.body.images = [];

//   // await Promise.all(
//   //   req.files.images.map(async (file, i) => {
//   //     const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//   //     await sharp(file.buffer)
//   //       .resize(2000, 1333)
//   //       .toFormat("jpeg")
//   //       .jpeg({ quality: 90 })
//   //       .toFile(`public/img/tours/${filename}`);

//   //     req.body.images.push(filename);
//   //   })
//   // );

//   next();
// });

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
