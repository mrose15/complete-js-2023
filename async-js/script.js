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

btn.addEventListener('click', function () {
  getCountryData('australia');
});

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
const lotteryPromise = new Promise(function (resolve, reject) {
  //executor function
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying setTimeout
const wait = function (seconds) {
  // don't need reject b/c it's impossible for setTimeout to fail
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));
