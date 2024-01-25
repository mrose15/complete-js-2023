"use strict";
/*
TODOs:
- handle workout id generation with library
- Ability to edit a workout
- Ability to delete a workout
- Ability to delete all workouts
- Ability to sort workouts by a certain field (eg: distance)
- Re-build Running and Cycling objects coming from Local Storage. (Fix the problem where the running and cycling objects became regular objects after getting stored and retrieved from local storage)
- More realistic error and confirmation messages
- Ability to position the map to show all workouts
- Ability to draw lines and shapes instead of just points
- Geocode location from coordinates (eg: "Run in Faro, Portugal")
- Display weather data for workout time and place (after async)

*/

class Workout {
  // if this app had thousands of users, it's likely that users would enter a workout at the same time, thus getting the same id
  // handle with library?
  date = new Date();
  id = (Date.now() + "").slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / this.duration / 60;
    return this.speed;
  }
}

///////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class App {
  //private instance properties
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;

  constructor() {
    // Get user's position
    this.#getPosition();

    // get data from local storage
    this.#getLocalStorage();

    //Attach event handlers
    form.addEventListener("submit", this.#newWorkout.bind(this));
    inputType.addEventListener("change", this.#toggleElevationField);
    containerWorkouts.addEventListener("click", this.#moveToPopup.bind(this));
  }

  #getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.#loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }

  #loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

    //turn these into variables
    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //handling clicks on map to show form
    this.#map.on("click", this.#showForm.bind(this));

    this.#workouts.forEach((work) => {
      this.#renderWorkoutMarker(work);
    });
  }

  #showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  #hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  #toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  #newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // if workout running, create running object
    if (type === "running") {
      // Check if data is valid
      const cadence = +inputCadence.value;
      // guard clause, check for the opposite of what we want, if that is true then we return the function immediately
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert("Inputs have to be positive numbers!");

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // if workout cycling, create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert("Inputs have to be positive numbers!");

      // create new Cycling object
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // render workout on map as maker
    this.#renderWorkoutMarker(workout);

    // render new workout on list
    this.#renderWorkout(workout);

    // hide form and clear inputs
    this.#hideForm();

    // Set local storage to all workouts
    this.#setLocalStorage();
  }

  #renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }

  #renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === "running") {
      html += `<div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
      </li>`;
    }

    if (workout.type === "cycling") {
      html += `<div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>`;
    }

    form.insertAdjacentHTML("afterend", html);
  }

  #moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // objects coming from local storage will not inherit all the methods they did before
    // workout.click();
  }

  #setLocalStorage() {
    //local storage is blocking so I wouldn't use local storage to store a large amount of data
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  #getLocalStorage() {
    // lost prototype chain, this is a problem when working with local storage and OOP
    // could loop over data and then restore the objects by creating a new object using the class
    const data = JSON.parse(localStorage.getItem("workouts"));

    if (!data) return;

    let workouts;

    if (data.type === "running") {
      workouts = new Running(
        data.coords,
        data.distance,
        data.duration,
        data.cadence
      );
    }

    if (data.type === "cycling") {
      workouts = new Cycling(
        data.coords,
        data.distance,
        data.duration,
        data.cadence
      );
    }

    console.log(new Running([0, 0], 0, 0, 0));
    console.log(new Cycling([0, 0], 0, 0, 0));

    console.log(workouts);

    console.log(data);

    //restore data across page reloads
    this.#workouts = data;

    this.#workouts.forEach((work) => {
      this.#renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem("workouts");
    location.reload();
  }
}

const app = new App();
