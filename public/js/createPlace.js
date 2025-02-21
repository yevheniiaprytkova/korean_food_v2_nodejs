/* eslint-disable */

import axios from "axios";

export const createPlace = async (
  name,
  ratingInternet,
  urlLocation,
  location,
  distance,
  openHours,
  urlPlace,
  image,
  video
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/places`,
      data: {
        name,
        ratingInternet,
        urlLocation,
        location,
        distance,
        openHours,
        urlPlace,
        image,
        video,
      },
    });
    if (res.data.status === "success") {
      clearForm();
    }
  } catch (err) {
    console.error(err.message);
  }
};

export const clearForm = () => {
  document.getElementById("name").value = "";
  document.getElementById("ratingInternet").value = "";
  document.getElementById("urlLocation").value = "";
  document.getElementById("location").value = "";
  document.getElementById("distanceMap").value = "";
  document.getElementById("openHours").value = "";
  document.getElementById("urlPlace").value = "";
  location.reload();
};
