'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data) {
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

  const html = `<article class="country">
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
  countriesContainer.style.opacity = 1;
};

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
  });
};

getCountryAndNeighbor('portugal');
