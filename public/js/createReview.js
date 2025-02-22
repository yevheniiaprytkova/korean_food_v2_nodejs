/* eslint-disable */

import axios from "axios";
import { showAlert } from "./alert";

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
    showAlert("error", "Cannot add empty review!");
  }
};

export const clearForm = () => {
  document.getElementById("review").value = "";
  document.getElementById("rating").value = "";
};
