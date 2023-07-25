"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/* Selecting, Creating, Deleting, Elements */
/* console.log(document.documentElement);
console.log(document.head);
console.log(document.body); */

const header = document.querySelector(".header");

// returns a node list, does not update on DOM change
const allSections = document.querySelectorAll(".section");

document.getElementById("section--1");

// returns html collection, updates when the dom updates (ie: element is deleted)
const buttons = document.getElementsByTagName("button");

// creating and inserting elements
//create DOM object
const message = document.createElement("div");
message.classList.add("cookie-message", "full-bleed");
//message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got It!</button>";

//header.prepend(message);
header.append(message);
//header.append(message.cloneNode(true));

//header.before(message);
//header.after(message);

// Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    //message.remove();
    //dom traversing
    message.parentElement.removeChild(message);
  });

// Styles
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

//document.documentElement.style.setProperty("--color-primary", "purple");

//Attributes
const logo = document.querySelector(".nav__logo");
logo.alt = "Beautiful minimalist logo";

//non-standard
logo.setAttribute("company", "Bankist");

const link = document.querySelector(".nav__link--btn");

// classes
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); // not includes like it is in arrays

// don't use b/c will override current classes
logo.className = "jonas";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  //console.log(s1coords);

  //console.log(`button element`);
  //console.log(e.target.getBoundingClientRect());

  //console.log("Current scroll (X/Y)", window.scrollX, window.scrollY);

  //console.log(s1coords.top + window.scrollY);

  //Scrolling
  //old shool way
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: "smooth",
  // });

  // new way
  section1.scrollIntoView({ behavior: "smooth" });
});
