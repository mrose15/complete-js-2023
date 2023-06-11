'use strict';

// Coding Challenge #2
/* 
This is more of a thinking challenge than a coding challenge 🤓
Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!
And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.
GOOD LUCK 😀
*/

/*
My code

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.addEventListener('click', function(){
        header.style.color = 'blue';
    });

}());*/
//The above function works because even though the parent function is done when it's run once, the event listener's callback function still has access to the parent's variables


/*
Instructor's code with explanation:
This works because of the closure
By the time the addEventListener's callback is executed, the IIFE expression is long gone and the header variable is gone as well
But the callback function is attached to the body element so it's waiting for some events to happen there.
When the event happens, the callback function is executed.
Even though the environment is which the callback function was created is already gone, it's still able to access the variables that were created in that variable by the time the function was born
The IIFE is the birthplace of the event handler function so the function remembers all the variables present at the time of its birth.

We can also say the header variable is in the backpack of this function.
*/

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.querySelector('body').addEventListener('click', function(){
        header.style.color = 'blue';
    });
}());


