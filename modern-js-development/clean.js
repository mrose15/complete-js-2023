"strict mode";

//freeze can also be used on arrays
// does not perform a deep freeze
const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

// you can change object properties within the array
budget[0].value = 100000;
// but you can't change an object to a string in this case
budget[9] = "Jonas";

// freeze makes this immutable
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
//spendingLimits.jay = 200;
//console.log(spendingLimits);

// alternative ways of getting limit
//const limit = spendingLimits[user] ? spendingLimits[user] : 0;
//const limit = spendingLimits?.[user] ?? 0;
const getLimit = (user) => spendingLimits?.[user] ?? 0;

//sometimes it's ok to have more than 2-3 params
// this is now a pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "jonas"
) {
  // this is mutating the object
  user = user.toLowerCase();

  const cleanUser = user.toLowerCase();

  return value <= getLimit(cleanUser)
    ? // b/c of freeze, this push makes this now an impure function (ie: side effect)
      // we should not mutate the original array
      // we'll need to make a copy and mutate the copy
      // budget.push({ value: -value, description, user: cleanUser });

      // [...] creates copy of state array
      [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);

// jay is not allowed to add anything, no effect
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");

// would normally use currying for the above chaining Ie: composing
// out of scope for this course?

console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

const checkExpenses = function () {
  for (const entry of budget)
    if (entry.value < -getLimit(entry.user)) entry.flag = "limit";
};
checkExpenses();

const logBigExpenses = function (bigLimit) {
  let output = "";
  for (const entry of budget) {
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
logBigExpenses(500);
