"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    console.log(this);
    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords)
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();

    //handling clicks on map
    this.#map.on("click", function (mapE) {
      this.#mapEvent = mapE;
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  }
  _showForm() {}
  _toggleElevationField() {}
  _newWorkout() {}
}

const app = new App();
app._getPosition();

class Workout {
  constructor(location, distance, time) {
    this.location = location;
    this.distance = distance;
    this.time = time;
  }
}

class Running extends Workout {
  constructor() {
    super(location, distance, time);
  }
  /*
  running: pace, steps/minute (candence))
  */
}

class Cycling extends Workout {
  constructor() {
    super(location, distance, time);
  }
  /*
  cycling: speed and elevation gain
  */
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  //clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";

  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;

  //Display marker
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
