import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(`${numPages} pages`);

    //Page 1, and there are additional pages
    if (currPage === 1 && numPages > 1) {
      return this._generateButton('next', currPage + 1);
    }

    // Last Page
    if (currPage === numPages && numPages > 1) {
      return this._generateButton('prev', currPage - 1);
    }

    // Other page
    if (currPage < numPages) {
      return `${this._generateButton(
        'prev',
        currPage - 1
      )}${this._generateButton('next', currPage + 1)}`;
    }

    // Page 1, and there are no other pages
    return ``;
  }

  _generateButton(type, page) {
    const btnClass = type === 'prev' ? 'prev' : 'next';
    const icon = type === 'prev' ? 'left' : 'right';
    return `
      <button class="btn--inline pagination__btn--${btnClass}">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${icon}"></use>
        </svg>
        <span>Page ${page}</span>
      </button>`;
  }
}

export default new PaginationView();
