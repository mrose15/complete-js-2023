// Exporting module, gets executed first
console.log("Exporting module");

const shippingCost = 10;
export const cart = [];

//exports need to happen in top level code
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as qty };

// export default, kinda like anon function
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
