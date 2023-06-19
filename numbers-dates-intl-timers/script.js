"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* 
  170. Converting and Checking Numbers
*/

// all numbers are presented as floating point numbers, always as decimals, even if we write them as integers or decimals
//console.log(23 === 23.0);
// Base 10 - 0 to 9
// Binary base 2 - 0 1
//console.log(0.1 + 0.2);
// can't do precise scientific or financial calculations in JS
//console.log(0.1 + 0.2 === 0.3); //false

//Conversion
//console.log(Number('23'));
//console.log(+'23'); //when JS sees the plus operator, it will do type coercion.

//Parsing
//console.log(Number.parseInt('30px', 10)); //30, a number, not a string
// in order for this to work it needs to start with a number
//console.log(Number.parseInt('e23', 10));
// accepts 2nd argument

//console.log(Number.parseInt('30px', 10));
// more modern to call these functions on the number object because it uses namspace
//console.log(Number.parseInt('2.5rem')); //2
//go to whenever you need to read a value out of a string, for example, coming from css
//console.log(Number.parseFloat('2.5rem')); //2.5

//old school way
//console.log(parseFloat('2.5rem')); //2.5

//isNAN, check if value is NaN
//console.log(Number.isNaN(20)); //false
//console.log(Number.isNaN('20')); //false
//console.log(Number.isNaN(+'20X')); //true
//console.log(Number.isNaN(23 / 0)); //false, dividing by 0 is not allowed in Math because it equals infinity, infinity is NaN and a special value
//isNaN is not a perfect way of checking if a number is NaN because it doesn't consider this use case

//isFinite, better to check if a number, go to
//console.log(`isFinite: ${Number.isFinite(20)}`);
//console.log(`isFinite: ${Number.isFinite('20')}`);
//console.log(`isFinite: ${Number.isFinite(+'20X')}`);
//console.log(`isFinite: ${Number.isFinite(23/0)}`); //false

//isInteger
//console.log(`isInteger: ${Number.isInteger(20)}`); //true
//console.log(`isInteger: ${Number.isInteger(20.0)}`); //true
//console.log(`isInteger: ${Number.isInteger(23 / 0)}`); //false

/* 
  171. Math and Rounding
*/
// console.log(Math.sqrt(25));
// console.log(25 ** (1/2)); //same as above but with exponentiation operator
// console.log(8 ** (1/3)); //cubic root, only way to calculate

// console.log(Math.max(5, 18, 23, 11, 2)); //23
// console.log(Math.max(5, 18, '23', 11, 2)); // 23, does type coersion
// console.log(Math.max(5, 18, '23px', 11, 2)); // NaN, does not parse

// console.log(Math.min(5, 18, 23, 11, 2)); //2

// calc area of a circle with 10px radius
// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// //random dice rolls, +1 to offset truncation
// console.log(Math.trunc(Math.random()* 6) + 1);

// // generalize the above formula into function
// // changed to floor to handle negative numbers
// const randomInt = (min,max) => Math.floor(Math.random() * (max - min) + 1 + min);
// console.log(randomInt(10, 20));

// //rounding integers
// console.log(Math.trunc(23.3)); //23

// console.log(Math.round(23.3)); //23
// console.log(Math.round(23.9)); //24

// console.log(Math.ceil(23.3)); //24
// console.log(Math.ceil(23.9)); //24

// console.log(Math.floor(43.3)); //43
// console.log(Math.floor('43.9')); //does type coersion

// // floor and trunc both remove the decimal point
// console.log(Math.trunc(-53.3)); //-53
// console.log(Math.floor(-53.3)); //-54, floor is better than trunc because it works in more situations

// rounding decimals
// console.log((2.7).toFixed(0)); //returns a string
// console.log((2.7).toFixed(3));
// console.log(+(2.345).toFixed(2)); //2.35 as a number type
// so with decimals it works differently than with integers b/c things in JS evolved in a weird way in this old language
// ^ these are numbers which are a primitive type, which don't have methods. JS will do boxing, which transforms this into a number object, then call the method on that object and once the operation is complete, it will convert it back to a primitive type.

/* 
  172. The Remainder Operator
*/
// console.log(5 % 2); //remainder of 1
// console.log(5/2); // 5 = 2 * 2 + 1

// console.log(8 % 3); //2
// console.log(8 / 3); // 8 = 2 * 3 + 2

// console.log(6 % 2);
// console.log(6 / 2);

// console.log(7 % 2);
// console.log(7 / 2); // 7 = 2 * 3 + 1

// const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(514));

labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    // at 0, 2, 4, 6, 8etc
    if (i % 2 === 0) row.style.backgroundColor = "orangered";
    // at 0, 3, 6, 9 etc
    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});

/* 
  173. Numeric Separators
*/
// 287,460,000,000

// const diameter = 287_460_000_000;
// console.log(diameter); //engine ignores separators

// const price = 345_99;
// console.log(price);

// const transferFee1 = 15_00;
// const transferFee2 = 1_500;

// const PI = 3.1415;
// console.log(PI);

// console.log(Number('230_000'));
// //only used in code, not in Number function
// console.log(parseInt('230_000')); //230, everything after _ is ignored

/* 
  174. Working with BigInt
  - BigInt is a special type of Integer, numbers are represented internally as 64 bits, which means there are exactly 64 ones or zeros to represent any given number.
  - Of these 64 bits, only 53 are used to store the digits themselves
  - The rest are for storing the position of the decimal point and the sign
  - If there are only 53 bits to store the number, that means there is a limit of how big numbers can be.
  - We can calculate that number
*/
// console.log(2 ** 53 - 1); //2 elevated to 53, minus 1 because the numbers start at 0
// // this it the biggest number that JS can safely represent
// console.log(Number.MAX_SAFE_INTEGER); // same as above

// console.log(2 ** 53 + 1); // 9007199254740992, JS cannot represent these numbers correctly
// // if we do calculations with numbers that are larger than this, we might lose precision
// // In some cases, it works but that's b/c JS does some tricks behind the scenes

// console.log(2347283742938472384723847234n); //w/o n, it displays as decimal number

// console.log(BigInt(234728374293)); //constructor function should only be used with smaller numbers, like this one

// //Operations
// console.log(10000n + 10000n);
// console.log(2347283742938472384723847234n * 1000000n);
// // can't mix BigInt with regular numbers

// //console.log(Math.sqrt(16n)); // can't convert BigInt to number

// const huge = 2347283742938472384723847234n;
// const num = 23;
// console.log(huge * BigInt(num));

// // Exceptions
// console.log(20n > 15); //true
// console.log(20n === 20); //false, === does not do type coercio
// console.log(typeof 20n); //bigint
// console.log(20n == '20'); //true

// // String concatenations
// console.log(huge + ' is REALLY big!!'); // number is converted to string

// //Division
// console.log(10n / 3n); // 3n, removes decimal
// console.log(10 / 3); // 3.3333333333

/* 
  175. Creating Dates
*/
// create a date, 4 ways
/*
const now = new Date();
console.log(now);

console.log(new Date('May 15 2023 12:45'));
console.log(new Date('December 24, 2015'));
// this method is unreliable
// better to use Date provided by JS instead of hard coded

console.log(new Date(account1.movementsDates[0]));
//this is ok because this is JS generated, Z = UTC, Coordinated Universal Time, the time w/o any timezone in London and also w/o daylight savings.

console.log(new Date(2037, 10, 19, 15, 23)); //Date Thu Nov 19 2037 15:23:00 GMT-0800 (Pacific Standard Time), month is 0 based
// JS autocorrects the day
console.log(new Date(2037, 10, 31, 15, 23)); // auto corrects to next day, Dac 1

//pass into the date constructor, the amount of milliseconds passed since the beginning of the Unix time, which is January 1, 1970
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // days to milliseconds conversion
// 3 * 24 * 60 * 60 * 1000 = 259200000 = timestamp
*/

// working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear()); //don't use getYear() because it's deprecated
// console.log(future.getMonth()); // 0 based, 10
// console.log(future.getDate()); //day of the month
// console.log(future.getDay()); //day of the week, 4 = Thursday
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString()); //international standard
// console.log(future.getTime()); //timestamp = 2142256980000

// console.log(new Date(2142256980000)); //reverses timestamp to give us future variable

// console.log(Date.now); // gets current timestamp

// // set versions of all above methods, all perform auto correction
// future.setFullYear(2040);
// console.log(future);

/* 
  177. Operations with Dates
*/
const future = new Date(2037, 10, 19, 15, 23);
//console.log(+future); // timestamp in milliseconds

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
//1000 milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
//console.log(days1); // gets date in milliseconds

/* 
  179. Internationalizating Numbers (intl)
*/

const num = 3884764.23;

const options = {
  style: "currency",
  //unit: "celsius",
  currency: "EUR",
  //useGrouping: false,
};

/*console.log("US: ", new Intl.NumberFormat("en-US", options).format(num));
console.log("Germany: ", new Intl.NumberFormat("de-DE", options).format(num));
console.log("Syria: ", new Intl.NumberFormat("ar-SY", options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);*/

/* 
  180. Timers: setTimeout and setInterval
*/
//async JS
const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
//console.log("Waiting...");

//if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

// setTimeout
/*
setInterval(function () {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  // console.log(future.getMinutes());
  // console.log(future.getSeconds());
  console.log(`${hour}:${minutes}:${seconds}`);
}, 1000);
*/
