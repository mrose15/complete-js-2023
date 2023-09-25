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
//console.log(Person.prototype);
// adding a method this way means now there's only one copy of this function. all objects that are created using the constructor function can reuse this function.
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear); //this keyword is set to the object that is calling the method
};

//michele.calcAge();
//matilda.calcAge();

// special property to verify prototype
//console.log(michele.__proto__);
//console.log(michele.__proto__ === Person.prototype); //true
//Person.prototype is what's going to be used as the prototype of all the objects that are created with the person constructor function

//console.log(Person.prototype.isPrototypeOf(michele));
// person.prototype is the prototype of michele
//console.log(Person.prototype.isPrototypeOf(matilda)); //true
//console.log(Person.prototype.isPrototypeOf(Person)); //false
// this confusion comes from bad naming of this property
// could be thought of prototypeOfLinkedObjects instead of prototype

Person.prototype.species = "Homo Sapiens";
//console.log(michele.species, matilda.species); //get access to species from prototype

//console.log(michele.hasOwnProperty("firstName")); //true
//console.log(michele.hasOwnProperty("species")); //false
// ^ false because this property is not really inside of the michele object

//210. Prototypal Inheritance and the prototype chain
/*
Everything starts with te Person constructor function.
This constructor function has a prototype property, which is an object and inside that object we defined the calcAge method
Person.prototype itself also has a reference back to person which is the contructor property
- Person.prototype.constructor is going to point back to person itself
- Important to remember that person.prototype is not the prototype of person but of all the objects that are created through the person function

The new operator- 
1-an empty object is created
2-this keywork in constructor function all is set to the new object
3- the new object is linked (__proto__ property) to the constructor function's prototype property. This property always points to the object's prototype and that is true for all objects in JS
4 - the new object is returned from the constructor function call unless we explicitly return something else but in a constructor function like Person we almost never do that

This is how it works with function constructors and ES6 classes but not with Object.create

.calcAge can't be found in the jonas Object so it searches up to the __proto__ property to find the Person.prototype object, which is called prototypal inheritance or delegation

if all objects had to carry the calcAge function around that would impact performance. Instead they can use the calcAge function from their common prototype

Looking up objects is call the prototype chain
Person.prototype has a prototype called Object.prototype, which is called whenever we write an object literal.

__proto__ of Object is null

Similar to scope chain
*/

// 211. Prototypal Inheritance on Built-In objects
//console.log(michele.__proto__); // Person
//console.log(michele.__proto__.__proto__); // Object
//console.log(michele.__proto__.__proto__.__proto__); //null

//console.dir(Person.prototype.constructor); // points to Person
// any function is an object so therefore it has a prototype

const arr = [3, 6, 6, 5, 6, 9, 3, 9]; // same as new Array
//console.log(arr.__proto__); // shows array methods
//console.log(arr.__proto__ === Array.prototype); //true
//console.log(arr.__proto__.__proto__); //Object

// all arrays will inherit this method
// extending the prototype is not a good idea. if you're working on a small project it's ok. but don't do this b/c the next version of JS might add a method of the same name but it might work in a different way
// if multiple implement the same method with a different name, you'll get bugs
Array.prototype.unique = function () {
  return [...new Set(this)];
};

//console.log(arr.unique());

const h1 = document.querySelector("h1");
//console.dir(h1); //HTMLElement
// huge prototype chain, 6 or 7 levels
//console.dir((x) => x + 1);

//213. ES6 Classes
// class expression
// const PersonCl = class {}

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // methods will be added to .prototype property of person class
  calcAge() {
    console.log(2023 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const jessica = new PersonCl("Jessica", 1985);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype); // true

// same as adding function to class above
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

/*
1. Classes are not hoisted (function declarations are hoisted)
2. Classes are first class citizens, can be passed into functions and can be returned from functions
3. the body of a class is always executed in strict mode
*/

/* Which is better? Constructor functions or Classes
- Constructor functions are not deprecated or old and are valid
- This is more a question of personal preference
- If you don't understand prototypal inheritance, don't use Classes
- Some say Classes are bad in general and no one should use them b/c they hide the true nature of JS. 
- Jonas says they're ok to use
*/
