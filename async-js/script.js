'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//  OUR FIRST AJAX CALL: XMLHttpRequest

const renderCountry = function (data, className = '') {
  const currency = () => {
    for (const currencyCode in data.currencies) {
      if (data.currencies.hasOwnProperty(currencyCode)) {
        const currencyInfo = data.currencies[currencyCode];
        return `<p class="country__row"><span>💰</span>${currencyInfo.name}</p>`;
      }
    }
  };

  const language = () => {
    for (const languages in data.languages) {
      if (data.languages.hasOwnProperty(languages)) {
        const languageInfo = data.languages[languages];
        return `<p class="country__row"><span>🗣️</span>${languageInfo}</p>`;
      }
    }
  };

  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} million people</p>
      ${language()}
      ${currency()}
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  //countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbor = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbor country (2)
    const neighbor = data.borders?.[0].toLowerCase();

    if (!neighbor) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha?codes=${neighbor}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbor');
    });
  });
};
*/

//getCountryAndNeighbor('portugal');
//getCountryAndNeighbor('usa');

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMessage} (${response.status})`);
    }
    return response.json();
  });
};

// const getCountryData = function (country) {
//   //Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       //const neighbor = data[0].borders?.[0];
//       const neighbor = 'sfsdfs';

//       if (!neighbor) return; //will work on error handling later

//       //Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbor'))
//     .catch(err => {
//       renderError(`Something went wrong 💣 💣 💣 ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  //Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];

      if (!neighbor) throw new Error('No neighbor found');

      //Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbor'))
    .catch(err => {
      renderError(`Something went wrong 💣 💣 💣 ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

/*btn.addEventListener('click', function () {
  getCountryData('australia');
});*/

//console.log('Test start'); //1
//setTimeout(() => console.log('0 sec timer'), 0); //4
//promise gets immediately resolved
//Promise.resolve('Resolved promise 1').then(res => console.log(res)); //3, b/c of microtasks queue
/*Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 100; i++) {
    console.log(res);
  }
});*/
//console.log('test end'); //2

// lottery promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   //executor function
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

//lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying setTimeout
// const wait = function (seconds) {
//   // don't need reject b/c it's impossible for setTimeout to fail
//   return new Promise(resolve => setTimeout(resolve, seconds * 1000));
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 seconds second'));

// will resolve immediately
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

//promisyfing the geoloction api
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     // same as above
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

//getPosition().then(pos => console.log(pos.coords.latitude));

//consuming promises
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('No such place!');
//       return res.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('Country not found ${res.status}');
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.log(`I'm sorry Hal, I can't do that because ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

//btn.addEventListener('click', whereAmI);

// async/await - syntatic sugar over then methods
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//consuming promises with async/await
//fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));
const whereAmI = async function (country) {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    // in case of 403 error, needs to be done manually
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    //Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    // in case of 403 error
    if (!resGeo.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💣`);
    renderError(`💣 ${err.message}`);

    //Reject promise returned from async function
    throw err;
  }
};

//console.log('1: Will get location');

// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💣 `))
//   .finally(() => console.log('3: Finished Getting location'));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 💣 `);
//   }
//   console.log('3: Finished Getting location');
// })();

//running promises in parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    //console.log([data1.capital, data2.capital, data3.capital]);

    //Promise.all short circuits when 1 promise rejects
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

//get3Countries('portugal', 'canada', 'tanzania');

// Other Promise Combinators
// Promise.race - settled (value is available) as soon as 1 of the input promises settles, only one gets returned. It short circuits and returns a rejected promise when nothing can be returned
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  //console.log(res[0]);
})();

//useful to prevent against never ending or long running promises (ie: bad internet connections)
// Can create timeout promise which auto rejects after a specified time has passed
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request too took long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/poland`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled - ES2020
// takes in array of promises, returns array of all settled promises
// never short circuits, unlike .all
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

//Promise.any - ES2021
// takes in array of multiple promises and returns the first fullfilled promise (only returns the first successfull promise it finds). Ignores rejected promises.
// Similar to Promise.race except rejected promises are ignored
Promise.any([
  Promise.resolve('Any Success'),
  Promise.reject('Any ERROR'),
  Promise.resolve('Any Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
