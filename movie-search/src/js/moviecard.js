import { createDomElement } from './worker';

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
    card.id = this.imdbID;

    const cardInnerHtml = `<h2 class="movie-card__title">
        <a href="#" class="movie-card__link">${this.title}</a>
      </h2>
      <img class="movie-card__poster" src="${this.poster}" alt="${this.title}">
      <span class="movie-card__year">${this.year}</span>
      <span class="movie-card__rating">${rate}</span>`;

    card.innerHTML = cardInnerHtml;

    return card;
  }
}

