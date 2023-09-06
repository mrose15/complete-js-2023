"use strict";

// 208. Constructor functions and the New Operator
// arrow function will not work as a function constructor b/c it doesn't have its own 'this' keyword
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //never do this b/c each object we create would carry this function which is bad for performance. instead use prototypes and prototype inheritance
  /*this.calcAge = function(){
    console.log(2037 - this.birthYear);
  }*/
};

const michele = new Person("Michele", 1985);
//console.log(michele);

// 1. new empty object is created
// 2. function is called, this = newly created object in step 1
// 3. newly created object is linked to prototype
// 4. function automatically returns the empty object from the beginning, but the object no longer needs to be empty. This is the trick of making the constructor function work

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
//console.log(matilda, jack);

// JS doesn't really have Classes in the sense of traditional OOP. Here we created an object from a constructor function, which have been used to simulate classes

//console.log(michele instanceof Person);

// 209. Prototypes
console.log(Person.prototype);
// adding a method this way means now there's only one copy of this function. all objects that are created using the constructor function can reuse this function.
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear); //this keyword is set to the object that is calling the method
};

michele.calcAge();
matilda.calcAge();

// special property to verify prototype
console.log(michele.__proto__);
console.log(michele.__proto__ === Person.prototype); //true
//Person.prototype is what's going to be used as the prototype of all the objects that are created with the person constructor function

console.log(Person.prototype.isPrototypeOf(michele));
// person.prototype is the prototype of michele
console.log(Person.prototype.isPrototypeOf(matilda)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false
// this confusion comes from bad naming of this property
// could be thought of prototypeOfLinkedObjects instead of prototype

Person.prototype.species = "Homo Sapiens";
console.log(michele.species, matilda.species); //get access to species from prototype

console.log(michele.hasOwnProperty("firstName")); //true
console.log(michele.hasOwnProperty("species")); //false
