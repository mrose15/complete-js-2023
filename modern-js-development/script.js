/*
//////////////////////////////////
// Exporting and Importing in ES6 Modules
*/

// Importing module
//import { addToCart, totalPrice as price, qty } from "./shoppingCart.js";

// console.log("Importing module");

// addToCart("bread", 5);
// console.log(price, qty);

//import all exports of a module at the same time, creates name space
// import * as ShoppingCart from "./shoppingCart.js";
// ShoppingCart.addToCart("bread", 5);
// console.log(ShoppingCart.totalPrice);

// will import the default export, can be given any name we want
//don't mix default and named exports, this is for test purposes only
// import add, { cart } from "./shoppingCart.js";
// add("pizza", 2);
// add("bread", 2);
// add("apples", 2);

//console.log(cart);

//can new use await keyword outside of an async function, or top level await, only works in modules
// console.log("Start fetching");
// const res = await fetch("https://jsonplaceholder.typicode.com/users/1/posts");
// const data = await res.json();
// console.log(data);

//but this will block the execution of the entire module, which is not great if it's a really long running task so use with caution
// console.log("Something");

//real world example
// const getLastPost = async function () {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users/1/posts");
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };
// const lastPost = getLastPost();
// console.log(lastPost); //calling an async function returns a promise and not the data; by the time we run this line of code, the data hasn't arrived, so you'll see a pending promise.

// // so instead use regular Promises but it's not very clean
// //lastPost.then((last) => console.log(last));

// // we can use top level await for this
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

//older module pattern, encapsulate data with functions
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//     );
//   };

//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart("apple", 4);
// ShoppingCart2.addToCart("pizza", 2);

// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost); //won't work because this is not being returned
// the above works due to closures
// if we want 1 module per file, we'd have to create different scripts and link all of them in the HTML file. This 1) creates ordering problems 2) all vars in global scope 3) can't use module bundler
// this is why native modules were added to ES6

//CommonJS Modules
//Export
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//   );
// };

//Import
// const {addToCart} = require('./shoppingCart.js');

//Intro to NPM
//import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};

//use Object.assign to create copy of object
const stateClone = Object.assign({}, state);
//lodash helps with cloning objects
const stateDeepClone = cloneDeep(state);
//const stateDeepClone2 = structuredClone(state);

state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);
//console.log(stateDeepClone2);

//Building with Parcel and NPM Scripts
//this is hot module reloading, the new modified bundle will get automatically injected into the broswer w/o a reload. Helps to maintain state
if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const michele = new Person("Michele");

console.log("Michele" ?? null);
//console.log(cart.find((el) => el.quantity >= 2));

Promise.resolve("TEST").then((x) => console.log(x));

//import "core-js/stable";
//if you want to cherry pick what ES6 feature you polyfill you can do this if you're concerned about bundle size
import "core-js/stable/array/find";
import "core-js/stable/promise";

// Polyfilling async functions, not included in core-js/stable
import "regenerator-runtime/runtime";

// these imports are usually done that the top of the file but they are hoisted

//clean and modern JS
/*
- make code readable
-- others should understand it
-- write code so that you can understand it in a year
-- avoid over complicated solutions
-- use descriptive variable name: what they contain
-- use descriptive function namea: what they do
*/

/*
- general best practices
-- use dry principle (refactor your code)
-- don't pollute global namespace, encapsulate instead
-- don't use var
-- use strong type checks (=== and !==)
*/

/*
- functions
- should only do one thing
- no more than 3 function params
- use default params whenever possible
- return same data type as received
- arrow functions when they make code more readable, ie: callback functions of array methods
*/

/*
- OOP
- use ES6 classes
- encapsulate data and don't mutate it from outside the class ( you'll need to manipulate some data that's in th class but for that you should use a public API)
- implement method chaining
- do not use arrow functions as methods (in reg objects) b.c you won't get access to the this keyword
*/
