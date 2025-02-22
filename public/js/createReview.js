/* eslint-disable */

import axios from "axios";

export const createReview = async (review, rating, place, person) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/reviews`,
      data: {
        review,
        rating,
        place,
        person,
      },
    });
    if (res.data.status === "success") {
      clearForm();
      location.reload();
    }
  } catch (err) {
    console.error(err.message);
  }
};

export const clearForm = () => {
  document.getElementById("review").value = "";
  document.getElementById("rating").value = "";
};
