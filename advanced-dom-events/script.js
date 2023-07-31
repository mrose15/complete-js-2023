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

/* 189. type of events and event handlers */
/*
const h1 = document.querySelector('h1');

const alertH1 = function(e){
  alert('addEventListener: Great! You are reading the heading :D');
}
*/

/* allows us to add multiple event listeners to the same event and can remove eventhandler if we don't need it anymore*/
/*
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
*/

/* old way 
h1.onmouseenter = function(e){
  alert('onmouseenter: Great! You are reading the heading :D');
};
*/

/* 191. event propagation in practice */
// rgb(255, 255, 255)

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1 + min);
// random gives us a number between 0 and 1
// if we multiply this number by max minus min, then we get a number between zero and max minus min
// + 1 was added when using Math.trunc, because you'd never get a number at the max value, +1 was to offset the cutting off of the decimal. Not sure it's needed when using floor or ceil
// if we add the minimum value to all of this, then we get a number somewhere between min and max, minus min plus min
// we can cancel the minus min plus min part of the equation, and we end up with a range between the minimum and max value that we specified
//const randomColor = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;

/*document.querySelector('.nav__link').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // in practice, not a good idea, can be used with many handler and many events
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
}); // can add 3rd param here (boolean) this is a use capture boolean, capturing goes down the dom from top level is DOM tree, it reverses the event listener, this event is now the first to fire
*/

/* 192. event delegation: implementing page navigation */



