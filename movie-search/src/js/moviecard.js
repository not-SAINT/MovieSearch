import { createDomElement } from './worker';
import * as AppOptions from './options';

export default class MovieCard {
  constructor({Title, imdbID, Year, Poster}) {
    this.title = Title;
    this.imdbID = imdbID;
    this.year = Year;
    this.poster = Poster;
  }

  render(rating) {
    const rate = rating || '-/10';
    const card = createDomElement('div', 'movie-card');
    // card.classList.add('movie-card__hide');
    card.id = this.imdbID;

    const cardInnerHtml = `<h2 class="movie-card__title">
        <a href="${AppOptions.MOVIE_URL}${this.imdbID}" class="movie-card__link" target="_blank">${this.title}</a>
      </h2>
      <img class="movie-card__poster" src="${this.poster}" alt="${this.title}">
      <span class="movie-card__year">${this.year}</span>
      <span class="movie-card__rating">${rate}</span>`;

    card.innerHTML = cardInnerHtml;

    return card;
  }
}

