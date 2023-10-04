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
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance methods will be added to .prototype property of person class
  calcAge() {
    //console.log(2023 - this.birthYear);
  }

  greet() {
    //console.log(`Hey ${this.firstName}`);
  }

  // classes have getters and setters too
  get age() {
    return 2037 - this.birthYear;
  }

  //setters and getters are useful for data validation
  //set a property that already exists
  set fullName(name) {
    //console.log(name);
    //using fullName property causes error, max call stack size exceeded b/c we're using the name, convention is to use _ as prefix
    if (name.includes(" ")) this._fullName = name;
    else alert("not a full name");
  }

  get fullName() {
    return this._fullName;
  }

  //static method, not available on instances
  static hey() {
    console.log("Hey there 🌊 ");
    console.log(this);
  }
}

const jessica = new PersonCl("Jessica Davis", 1985);
//console.log(jessica);
jessica.calcAge();
//console.log(jessica.age);

//console.log(jessica.__proto__ === PersonCl.prototype); // true

// same as adding function to class above
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
//jessica.greet();

const walter = new PersonCl("Walter White", 1965);
//console.log(walter);

//PersonCl.hey();

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
- ES Classes are cleaner and constructor functions are a mess
*/

// 214. Getters and Setters
// assessor properties, functions that get and set a value

const account = {
  owner: "Jonas",
  movements: [100, 200, 100, 300],

  // just getter or setter would be enough, no need to use both
  get latest() {
    return this.movements.slice(-1).pop();
  },

  //needs to have one param
  set latest(mov) {
    this.movements.push(mov);
  },
};

//used as property not a function
//console.log(account.latest);
account.latest = 50;
//console.log(account.movements);

// 215. Static methods
// Array.from (example of static method) is attached to the entire Array constructor and not to their prototype property of the Array constructor. It's not on their prototype (Array)
// all arrays do no inherit this method
// We say the .from method is in the Array namespace, just like on Number.parseFloat()

const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear - birthYear;
};

Person2.hey = function () {
  //console.log("Hey there 🌊 ");
  //whatever the object is calling the this keyword
  //console.log(this);
};

Person2.hey();
// we can't call jonas.hey b/c it's not in the prototype of the jonas object, there's no way the jonas object could inherit it

// 216. Object.create
// still the ideal of prototypal inheritance, no new operator and no constructor function
// least used way of implementing prototypal inheritance

// creates prototype of all person objects
const PersonProto = {
  calcAge() {
    //console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);
//console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

//console.log(steven.__proto__ === PersonProto); //true

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1990);
sarah.calcAge();

/* The big takeaweay is Object.create creates a new object, and the prototype of that object will be the object that we pass in.
This is important to understand for true Class inheritance */

// 218. Inheritance between classes: constructor functions
const Person3 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person3.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// constructor function
/*const Student = function (firstName, birthYear, course) {
  // The call() method of Function instances calls this function with a given this value and arguments provided individually.
  Person3.call(this, firstName, birthYear);
  this.course = course;
};

//Linking prototypes
// a student is also a person, we want person and student to be connected. we want to make Person the prototype of Student
//Object.create defines prototypes manually
Student.prototype = Object.create(Person3.prototype); // at this point Student.prototype is empty

//prototype
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge(); // doing method look up here
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); //true
console.log(mike instanceof Person3); //true
console.log(mike instanceof Object); //true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/

// 220. Inheritance between Classes: ES6 Classes
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // needs to happen first
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 70
      }`
    );
  }
}

const martha = new StudentCl("Martha Jones", 2012, "Medicine");
martha.introduce();
martha.calcAge();

// 221. Inheritance between Classes: Object.create
const PersonProto1 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const rose = Object.create(PersonProto1);

const StudentProto = Object.create(PersonProto1);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto1.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const donna = Object.create(StudentProto);
//donna.init("Donna", 2000, "Data Entry");
//donna.introduce();
/* devs think this pattern is better than trying to fake classes in JS. Using Object.create, we're not faking classes, we just linking objects together. ES6 Classes and constructor functions are more used in the real world. You'll mostly see ES6 Classes */

/* 222. Another Class Example */

class Account {
  // 1) public fields (only on instances, not prototype), references able by the this keyword
  locale = navigator.language;

  // 2) private fields (cannot be referenced from the outside)
  #movements = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //protected property
    this._pin = pin;
    //this._movements = [];
    //this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}!`);
  }
  //public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    //abstracted minus away from user
    this.deposit(-val);
  }

  // not part of public API
  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    // for encapsulation and data privacy of approveLoan
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
    }
  }
}

const acc1 = new Account("Michele", "USD", 1111);
console.log(acc1);

//acc1.#movements.push(250); // this underscore is a flag to let dev team know that this property is not supposed to be touched outside of the class
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
//acc1._approveLoan(1000); //should not be allowed to access method. only requestLoadn should be able to access this method
console.log(acc1.getMovements());

console.log(acc1);
//console.log(acc1.pin); // this is a security issue

/* 223. Encapsulation: Protection Properties and Methods */
/* Encapsulation means to keep some properties and methods private inside the class
so that they're not accessible from outside the class. The rest of the methods are exposed as a public interface (API)
- adding an underscore to the movements does not make the property truly private because this is just a convention. just something devs agree to use
*/

/* 224. Encapsulation: Private Class Fields and Methods */
/*
JS is moving away from the idea that classes are just syntactic sugar over constructor functions. with this class fields, classes start to have abilities that they didn't have with constructor functions.

4 different kinds of fields and methods ( actually 8)
 - public fields, think of a field as a property that will be on all instances (public instance field)
 - private fields
 - public methods
 - public fields

*/
