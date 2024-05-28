import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    // Temp error handling
    console.error(`${err} 🤯 🤯 🤯`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 🤯 🤯 🤯`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  //set state to current page
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;
  return state.search.results.slice(start, end); // slice doesn't include last value
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.foreach(ing => {
    //ing.quantity = ;
    // new qty = oldqt * newServings / oldServings
  });
};
