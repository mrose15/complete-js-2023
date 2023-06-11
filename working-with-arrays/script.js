'use strict';

// Bank Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/* 142. Simple Array Methods */

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1)); // last element of array
console.log(arr.slice(1, -2)); // extracts everything except the last two elements
console.log(arr.slice()); //creates shallow copy of array
console.log([...arr]); // same as above

//splice
//console.log(arr.splice(2)); // mutates original array
console.log(arr.splice(-1)); // removes last element of array
console.log(arr);
console.log(arr.splice(1,2)); // 2nd number is number of elements to remove
console.log(arr);

//reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //mutates original array
console.log(arr2);

// CONCAT
const letters =  arr.concat(arr2); //param takes 2nd array
console.log(letters);
console.log([...arr,...arr2]); // same as concat, either is fine

// JOIN
console.log(letters.join(' - ')); // results in a string
*/


/////////////////////////////////////////////////
/* 143. The new at Method */

/*
const arr = [23, 11, 64];

console.log(arr[0]);
console.log(arr.at(0)); // can replace bracket notation above

//get last element of array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1)); //perfect for method chaining
// if all you want to do is get the last element of arr, you can use bracket notation above

console.log('michele'.at(0));
console.log('michele'.at(-1));
*/


/////////////////////////////////////////////////
/* 144. looping arrays: forEach */
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for of
//for (const movement of movements) {
// to add a counter
/*
for (const [i, movement] of movements.entries()) {
  if(movement > 0){
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
*/

//forEach - higher order function that requires a callback function
//can't break out of it. you'll need to use a for of loop if you need to break out of it.
/*
console.log(`-------FOREACH-------`);
movements.forEach(function(mov, i, arr){
  if(mov > 0){
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
*/

/////////////////////////////////////////////////
/* 145. forEach with Maps and Sets */

//Map
/*const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
});
*/

//Set
//pass iterable
/*
const currenciesUnique = new Set(
  ['USD','EUR','EUR']
);

console.log(currenciesUnique);
currenciesUnique.forEach(function(value, _, map){
  console.log(`${value}: ${value}`);
});
*/
//keys and values are the same, the key parameter doesn't make sense
//an underscore in JS means a throwaway/unnecessary variable

/////////////////////////////////////////////////
/* 149. Data Transformations: map, filter, reduce */
/*
map method - creates a new array containing the results of applying an operation on all original array elements
filter method - returns a new array containing the array elements that passed a specific condition
reduce method - boils ("reduces") all array elements down to one single value (eg: adding all elements together), "snow ball effect"
*/

/////////////////////////////////////////////////
/* 150. The map method */
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//convert from Euros to USD
//more in line with functional programming, in tune with modern JS
//const eurToUsd = 1.1;

/*const movementsUSD = movements.map(function(mov){
  return mov * eurToUsd;
});*/


//for of loops is another way of achieving the same as map method but it's not considered functional programming
/*const movementsUSDfor = [];
for(const mov of movements){
  movementsUSDfor.push(mov * eurToUsd);
}*/
//console.log(movementsUSDfor);

//simplify map method with arrow function
//some argue that this leads to bad readibility but it's cleaner
/*const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements); // original array doesn't get mutated
console.log(movementsUSD);*/

/*const movementsDescriptions = movements.map((mov, i) => 
  `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);
console.log(movementsDescriptions);*/

/////////////////////////////////////////////////
/* 152. The filter method */
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//i and arr are available but rarely used
// const deposits = movements.filter(function(mov, i, arr){
//   return mov > 0;
// });
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

//filter method
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

//for of loop to show how it's done with this method, filter is cleaner and can be chained
// const withdrawalsFor = [];
// for (const mov of movements) if (mov < 0) withdrawalsFor.push(mov);
// console.log(withdrawalsFor);

/////////////////////////////////////////////////
/* 153. The reduce method */
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//console.log(movements);

//will be 1 value
//accumulator is like a snow ball
// reduce loops over the array and calls the callback in each iteration
// const balance = movements.reduce(function(acc, cur, i, arr){
//   console.log(`Interation ${i}: ${acc}`);
//   return acc + cur;
// }, 0); // start counting at 0

//console.log(balance); //3840

//const balance = movements.reduce((acc, cur) => acc + cur, 0);

// let balance2 = 0; //initial value
// for(const mov of movements) balance2 += mov;
// console.log(balance2);
// reduce removes use of extra variable

// Maximum value
/*const max = movements.reduce((acc, mov) => { return (acc > mov ? acc : mov);
}, movements[0]);

console.log(max);*/

/////////////////////////////////////////////////
/* 155. The Magic of Chaining Methods */
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//const eurToUsd = 1.1;

// filter and map returns new array
// can only chain if previous method returns new array
// PIPELINE
/*const totalDepositsinUSD = movements
  .filter(mov => mov > 0)
  //.map(mov => mov * eurToUsd)
  .map((mov, i, arr) =>{
    // can check array here with 3rd parameter of callback function
    //console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsinUSD);
*/

// chaining can be expensive, ie: limit map methods, look for opportunities to keep up performance
//bad practice to chain method that mutate original array


/////////////////////////////////////////////////
/* 157. The find method */
//used to find an element of an array based on a condition
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//withdrawal, returns the first element in the array for which condition is true
// filter returns all that match
// find element only returns the first element in the array and does not return an array
//const firstWithdrawal = movements.find(mov => mov < 0);
//console.log(movements);
//console.log(firstWithdrawal);


/////////////////////////////////////////////////
/* 160. The findIndex method */
// returns index of found element
// to delete element from array we need the splice method, but we need the index first
// similar to indexOf method, but with this you can only search for a value that is in the array but with findIndex you can create a complex condition

/*
find and findIndex methods get access to the current index, and the current entire array. So besides the current element, these other two values are also available, but are not too useful in practice.
Both methods were added to JS in ES6 so they won't work in very old browsers
*/

/////////////////////////////////////////////////
/* 161. some and every methods */
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
*/
//returns true if any value in array is exactly equal to the given value
//equality
//console.log(movements.includes(-130));

// specify condition
//console.log(movements.some(mov => mov === -130));
// if there is any value for which this condition is true, then the some method returns true
//const anyDeposits = movements.some(mov => mov > 0);
//console.log(anyDeposits);

// every method
// only returns true if every element passes the condition
//console.log(movements.every(mov => mov > 0)); //false

//function can be written separately and executed as a callback
//better for dry principle
/*
const deposit = mov => mov < 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/////////////////////////////////////////////////
/* 162. flat and flatmap methods */
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// removes nested array, no callback
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// only goes one level deep
console.log(arrDeep.flat(2)); //2 levels deep
*/

// extract movements from accounts array
// using chaining
/// flat
/*
const overallBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);
*/

//flatMap, only goes one level deep, combines the functionality of  flat and map
// if you need to go deeper than one level, you still need the flat method
/*
const overallBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);
*/

/////////////////////////////////////////////////
/* 163. sorting arrays */

//const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
//console.log(owners.sort());
//will mutate original array

//Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//console.log(movements);
//console.log(movements.sort()); //sorts as if the were strings

// return less than 0, A before B (keep order) 
// If greater than 0, B before A (switch order)
//ascending order
// movements.sort((a, b) => {
//   if(a > b) return 1;
//   if(a < b) return -1;
// });

//movements.sort((a, b) => a - b);
//console.log(movements);

//descending order
// movements.sort((a, b) => {
//   if(a > b) return -1;
//   if(a < b) return 1;
// });
//movements.sort((a, b) => b - a);
//console.log(movements);

//sort method won't work on mixed array (numbers and strings)

/////////////////////////////////////////////////
/* 164. more ways of creating and filling arrays */
const arr = [1,2,3,4,5,6,7];
//console.log(new Array(1,2,3,4,5,6,7));

//empty array + fill method
const x = new Array(7);
//console.log(x); // creates an array of 7 empty slots
//console.log(x.map(() => 5));

//similar to slice method, can specify begin parameter and end parameter
//x.fill(1,3,5); // Array(7) [ <3 empty slots>, 1, 1, <2 empty slots> ]
x.fill(1); // mutates underlying array
//console.log(x);

arr.fill(23, 2, 6);
//console.log(arr);

//Array.from, used on array constructor
const y = Array.from({length: 7}, () => 1); //creates same as line 395
//console.log(y);

//first parameter is not used so you indicate that with an underscore
const z = Array.from({length: 7}, (_, i) => (i + 1));
//console.log(z);

const rand = Array.from({length: 100}, (_, i) => (Math.floor(Math.random() * i)));
//console.log(rand);

/////////////////////////////////////////////////
/* 164. summary: which method to use and when */
/*
ask what you want from this method
- mutate the original array
  -- add to original
    --- push (adds to end of the array)
    --- unshift push (adds to start of the array)
  -- remove from original
    --- pop (removes from end of the array)
    --- shift (removes from start of the array)
    --- splice (any)
  -- others
    --- reverse
    --- sort
    --- fill  

- to create a new array
  -- computed from original
    --- map (loop)
  -- filtered using condition
    --- filter
  -- portion of original array
    --- slice
  -- adding original array to another
    --- concat
  -- flattening the original array
    --- flat
    --- flatMap 

- get an array index
  -- based on value
    --- indexOf
  -- based on test condition
    --- findIndex

- retrieve an entire array element
  -- based on test condition
    --- find

- or do I want to know if an array includes a certain element (all methods return boolean)
 -- based on value
    --- includes
  -- based on test condition
    --- some (at least 1)
    --- every (all elements need to match the condition)

- or want to get a new string
 -- based on a separator string
    --- join

- to transform the array to a new value
 -- based on a accumulator
    --- reduce (boil down array to single value of any type: number, string, boolean, or even new array or object)

- to just loop over the array
  -- based on callback
    --- forEach (does not create a new array or new value)
*/

/////////////////////////////////////////////////
/* 165. Array Methods Practice */

// 1. Calculate total value of deposits across all bank accounts
const bankDepositSum = accounts
.flatMap(acc => acc.movements)
.filter(mov => mov > 0)
.reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2. Count how many deposits in the bank with at least 1,000
const numDesposits1000 = accounts
.flatMap(acc => acc.movements)
//.filter(mov => mov >= 1000).length;
//.reduce((count, cur) => cur >= 1000 ? count + 1 : count, 0); // start count at 0, just like having a counter outside of a loop that we only update on a certain condition, can use to count something in an array
.reduce((count, cur) => cur >= 1000 ? ++count : count, 0); //can't use ++ after count because it will still return old value, prefixed ++ operator will work

console.log(numDesposits1000);

// prefixed ++ operator
let a = 10;
console.log(++a);

// 3. Create a new object with reduce (the swiss army knife of array methods)
// obj: create an object which contains the sum of the deposits and withdrawals
//destructure deposits and withdrawls immediately
const {deposits, withdrawals} = accounts
.flatMap(acc => acc.movements)
.reduce((sums, cur) => {
  //cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
  sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
  return sums;

}, {deposits: 0, withdrawals: 0})

console.log(deposits, withdrawals);

// 4. convert any string to title case
const convertTitleCase = function(title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
  .toLowerCase()  //set all letters to be lower case first
  .split(' ')
  .map(word => exceptions.includes(word) ? word : capitalize(word))
  .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));