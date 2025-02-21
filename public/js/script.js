/* eslint-disable */
import "@babel/polyfill";
import { createReview, clearForm } from "./createReview";
import { createPlace } from "./createPlace";

window.onload = function () {
  /////////////////////////////////////////////////////
  // Open and close Sort button
  /////////////////////////////////////////////////////

  const btnEl = document.querySelector(".sort-btn");
  const listEl = document.querySelector(".list");

  if (btnEl)
    btnEl.addEventListener("click", function () {
      listEl.classList.add("open");
    });

  const sortItemEl = document.querySelector(".sort-box-item");

  if (sortItemEl)
    sortItemEl.addEventListener("click", function () {
      listEl.classList.remove("open");
    });

  /////////////////////////////////////////////////////
  // Smooth scrolling animation
  /////////////////////////////////////////////////////

  const allLinks = document.querySelectorAll("a:link");
  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");

      // Open new tab
      if (href.startsWith("http")) window.open(href);

      // Scroll to other links
      if (href.startsWith("#")) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /////////////////////////////////////////////////////
  // Sort by
  /////////////////////////////////////////////////////

  const rating = document.querySelector(".rating-btn");
  const distance = document.querySelector(".distance-btn");
  const list = document.querySelector(".sort-list");
  let items;

  if (list) items = Array.from(list.querySelectorAll(".sort-item"));

  if (rating)
    rating.addEventListener("click", function () {
      items.sort((a, b) => {
        const [ratA, ratB] = [a, b].map(
          (el) => el.querySelector("#rating").textContent
        );
        return ratB - ratA;
      });
      items.forEach((el) => list.append(el));
    });

  if (distance)
    distance.addEventListener("click", function () {
      items.sort((a, b) => {
        const [ratA, ratB] = [a, b].map(
          (el) => el.querySelector("#distance").textContent.split(" ")[0]
        );
        return ratA - ratB;
      });
      items.forEach((el) => list.append(el));
    });

  /////////////////////////////////////////////////////
  // Sticky navigation
  /////////////////////////////////////////////////////

  const header = document.querySelector(".header");
  const btnTop = document.querySelector(".btn-top");

  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      // console.log(ent);
      if (ent.isIntersecting === false) {
        document.body.classList.add("sticky");
        btnTop.style.display = "block";
      }

      if (ent.isIntersecting === true) {
        document.body.classList.remove("sticky");
        btnTop.style.display = "none";
      }
    },
    {
      // In the viewport
      root: null,
      threshold: 0,
      topMargin: "-80px",
    }
  );
  if (header) obs.observe(header);

  /////////////////////////////////////////////////////
  // Save New Review
  /////////////////////////////////////////////////////
  const newReviewForm = document.querySelector(".form-review");
  if (newReviewForm)
    newReviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const review = document.getElementById("review").value;
      const rating = document.getElementById("rating").value;
      const place = document.getElementById("place-id").textContent;
      let person;

      const personName = document.getElementsByName("person");
      for (let i = 0; i < personName.length; i++) {
        if (personName[i].checked) person = personName[i].value;
      }

      createReview(review, rating, place, person);
    });

  const clearFormBtn = document.querySelector(".btn-clear");
  if (clearFormBtn) clearFormBtn.addEventListener("click", clearForm);

  /////////////////////////////////////////////////////
  // Add New Place
  /////////////////////////////////////////////////////
  const newPlaceForm = document.querySelector(".form-place");
  if (newPlaceForm)
    newPlaceForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const ratingInternet = document.getElementById("ratingInternet").value;
      const urlLocation = document.getElementById("urlLocation").value;
      const location = document.getElementById("location").value;
      const distance = document.getElementById("distanceMap").value;
      const openHours = document.getElementById("openHours").value;
      const urlPlace = document.getElementById("urlPlace").value;

      const fileImage = document.getElementById("image").files[0];
      const fileVideo = document.getElementById("video").files[0];
      let image, video;
      if (fileImage) image = `/img/${fileImage.name}`;
      if (fileVideo) video = `/img/${fileVideo.name}`;

      createPlace(
        name,
        ratingInternet,
        urlLocation,
        location,
        distance,
        openHours,
        urlPlace,
        image,
        video
      );
    });

  console.log("Working");
};
