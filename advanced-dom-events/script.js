"use strict";
/*TODO: 
- add hamburger menu, make page responsive
- conditional to test is user just reloaded in the middle of the page for sections
- conditional to test is user just reloaded in the middle of the page for lazy loading of images in section 1
*/

///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Header
const header = document.querySelector(".header");

// Navigation
const nav = document.querySelector(".nav");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
///////////////////////////////////////

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

//Button Scrolling
btnScrollTo.addEventListener("click", function () {
  //const s1coords = section1.getBoundingClientRect();
  //old shool way
  //window.scrollTo({
  //left: s1coords.left + window.scrollX,
  //top: s1coords.top + window.scrollY,
  //behavior: "smooth",
  //});

  // new way
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
//Page navigation
// this method is not efficient
// this adds a callback function once to each of the three nav elements
// what if there are many more? You'd be creating a copy of this callback for each nav element and will impact performance
/*document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
*/

// event delegation - use the fact that events bubble up the DOM
// 1. add event listener to common parent element
// 2. determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  //guard clause, more modern than creating blocks
  if (!clicked) return;

  //remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //activate tab
  clicked.classList.add("operations__tab--active");

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// menu fade animation
// mouseover and mouseenter are similar but mouseenter does not bubble
// opposite events of mouseover and mouseenter, we use these to undo what we do on hover
// opposite of mouseenter is mouseleave
// opposite of mouseover is mouseout

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// Passing 'argument' into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation
// this way is not performant, esp on older devices b/c the event listener will be constantly running as the user scrolls
/* 
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener("scroll", function (e) {
  //console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
*/

// Sticky navigation: Intersection Observer API
// function gets run whether we're going up or down the page
/*const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null, // the element that the target is intersecting, you can select an element or you can write null and then we can observe our target element intersecting the entire viewport
  threshold: [0, 0.2], //10%, percentage of intersection at which the observer callback will be called, can have multiple thresholds, 0% means our callback will trigger each time the target element moves completely out of view and as soon as it enters and when it moves out of view. If you specified 1, the callback will only be called when 100% of the target is visible in the viewport (section is too big to fit into the viewport)
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); //target
*/
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //header will become sticky only when header is completely out of view
  rootMargin: `-${navHeight}px`, //is a box of 90px that will be applied outside of our target element, rem doesn't work
});
headerObserver.observe(header);

// reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  // since all section are revealed, unobserve, pass element that should be unobserved
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add("section--hidden");
});

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //need to wait for page to finish loading
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

//next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/* Selecting, Creating, Deleting, Elements */
/* console.log(document.documentElement);
console.log(document.head);
console.log(document.body); */

//const header = document.querySelector(".header");

// returns a node list, does not update on DOM change
//const allSections = document.querySelectorAll(".section");

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
//const logo = document.querySelector(".nav__logo");
//logo.alt = "Beautiful minimalist logo";

//non-standard
//logo.setAttribute("company", "Bankist");

//const link = document.querySelector(".nav__link--btn");

// classes
//logo.classList.add("c", "j");
//logo.classList.remove("c", "j");
//logo.classList.toggle("c");
//logo.classList.contains("c"); // not includes like it is in arrays

// don't use b/c will override current classes
//logo.className = "jonas";

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

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1 + min);
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

// 193. Dom Traversing
/*
const h1 = document.querySelector('h1');

// going downwards: child elements
console.log(h1.querySelectorAll('.highlight'));

//nodes can be anything, even comments
console.log(h1.childNodes);

//only gets HTML elements, works only for direct children
console.log(h1.children);

h1.firstElementChild.style.color = '#072185 ';
h1.lastElementChild.style.color = 'purple';

//Going upwards: parents
console.log(h1.parentNode); // direct parents, similar to childNodes
console.log(h1.parentElement);

// used a lot for event delegation
h1.closest('.header').style.background = 'var(--gradient-secondary)';
//if we're looking for the closest h1, we're going to get the selected element returned
h1.closest('h1').style.background = 'var(--gradient-secondary)';

// Going sideways selecting siblings
// can only access direct siblings
console.log(h1.previousElementSibling); //null
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); //includes h1

//HTMLCollection, not an array, but still an iterable that we can spread into an array
[...h1.parentElement.children].forEach(function(el){
  if(el !== h1){
    el.style.transform = 'scale(0.5)';
  }
})
*/
