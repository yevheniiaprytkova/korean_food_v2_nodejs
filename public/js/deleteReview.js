/* eslint-disable */

import axios from "axios";
import { showAlert } from "./alert";

export const deleteReview = async (review, reviewId) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/reviews/${reviewId}`,
      data: review,
    });
    location.reload();
    showAlert("success", "Review successfully deleted!");
  } catch (err) {
    console.log(err.message);
    showAlert("error", "Something went wrong");
  }
};
