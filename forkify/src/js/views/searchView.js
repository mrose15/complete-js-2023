class searchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search_field').value;
  }
}

export default new searchView();
