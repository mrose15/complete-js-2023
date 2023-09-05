"use strict";

// 208. Constructor functions and the New Operator
// arrow function will not work as a function constructor b/c it doesn't have its own 'this' keyword
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const michele = new Person("Michele", 1985);
console.log(michele);

// 1. new empty object is created
// 2. function is called, this = newly created object in step 1
// 3. newly created object is linked to prototype
// 4. function automatically returns the empty object from the beginning, but the object no longer needs to be empty. This is the trick of making the constructor function work

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(matilda, jack);

// JS doesn't really have Classes in the sense of traditional OOP. Here we created an object from a constructor function, which have been used to simulate classes

console.log(michele instanceof Person);
