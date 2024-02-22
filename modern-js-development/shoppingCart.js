// Exporting module, gets executed first
console.log("Exporting module");

//Blocking code, code in script.js has to wait for this, which is bad for performance
// using top level await will block this from running and will keep the code in script.js from running until this is finished
// console.log("Start fetching users");
// const res = await fetch("https://jsonplaceholder.typicode.com/users/1/users");
// console.log("Finish fetching users");

// const shippingCost = 10;
// export const cart = [];

// //exports need to happen in top level code
// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };

// const totalPrice = 237;
// const totalQuantity = 23;

// export { totalPrice, totalQuantity as qty };

// // export default, kinda like anon function
// export default function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// }

//encapsulate data with functions
(function () {})();
