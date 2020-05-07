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
    // onerror="this.src = 'img/image-not-found.gif' "
    // const poster = (this.poster !== 'N/A' && isValidImgSrc(this.poster, this.imdbID)) ? this.poster : AppOptions.NO_POSTER;
    const poster = (this.poster !== 'N/A') ? this.poster : AppOptions.NO_POSTER;
    const noPoster = ` onerror="this.src = '${AppOptions.NO_POSTER}'" `;
    const card = createDomElement('div', 'swiper-slide');

    const cardInnerHtml = `<div class="movie-card" slideid="${this.imdbID}">
      <h2 class="movie-card__title">
        <a href="${AppOptions.MOVIE_URL}${this.imdbID}/videogallery" title="${this.title}" class="movie-card__link" target="_blank">${this.title}</a>
      </h2>
      <img class="movie-card__poster" src="${poster}" alt="${this.title}" ${noPoster}>
      <span class="movie-card__year">${this.year}</span>
      <span class="movie-card__rating">${rate}</span>
      </div>`;

    card.innerHTML = cardInnerHtml;

    return card;
  }
}