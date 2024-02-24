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
// import add, { cart } from "./shoppingCart.js";
// add("pizza", 2);
// add("bread", 2);
// add("apples", 2);

// console.log(cart);

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
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);

console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); //won't work because this is not being returned
// the above works due to closures
