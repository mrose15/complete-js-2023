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
const getLimit = (limits, user) => limits?.[user] ?? 0;

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

  return value <= getLimit(limits, cleanUser)
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

//data transformations fix
// const checkExpenses2 = function (state, limits) {
//   return state.map((entry) => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: "limit" }
//       : entry;
//   });
//   // this for loop violates the principle of immutability
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(entry.user)) entry.flag = "limit";
// };

//same simplified function as above
const checkExpenses = (state, limits) =>
  state.map((entry) =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// this let goes against spirit of immutability
// in functional code you will likely never see the let variable
// const logBigExpenses = function (bigLimit) {
//   let output = "";
//   for (const entry of budget) {
//     output +=
//       entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

// with immutability in mind
const logBigExpenses = function (state, bigLimit) {
  // filter array for big expenses and then for each item in the new array, create a string containing an emoji
  const bigExpenses = state
    .filter((entry) => entry.value <= -bigLimit)
    .map((entry) => entry.description.slice(-2))
    .join(" / ");
  //advanced use case for reduce, can create strings using reduce
  //.reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, "");
  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 500);
