// Importing module
// import {
//   addToCart,
//   totalPrice as price,
//   qty,
// } from "./shoppingCart.js";

// console.log("Importing module");

// addToCart("bread", 5);
// console.log(price, qty);

//import all exports of a module at the same time, creates name space
// import * as ShoppingCart from "./shoppingCart.js";
// ShoppingCart.addToCart("bread", 5);
// console.log(ShoppingCart.totalPrice);

// will import the default export, can be given any name we want
//don't mix default and named exports, this is for test purposes only
import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 2);
add("apples", 2);

console.log(cart);
