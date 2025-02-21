const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Place = require("../models/placeModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connections successful"));

//READ JSON FILE
const places = JSON.parse(fs.readFileSync(`${__dirname}/places.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Place.create(places);
    await Review.create(reviews);
    await User.create(users);

    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Place.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();

    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
