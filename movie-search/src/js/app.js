import { getRandomIndex } from './worker';
import * as AppOptions from './options';
import MovieCard from './moviecard';


export default class MovieSearch {
  constructor(sliderId) {
    this.sliderId = sliderId;
    this.slider = document.getElementById(sliderId);
  }

  addNewSlides (slides) {
    slides.forEach((n) => {
      const card = new MovieCard(n);
      this.slider.append(card.render());
    });
  }

  loadDefaultMovieCards () {
    // export const def_res = {"Search":[{"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","imdbID":"tt0076759","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},{"Title":"Star Wars: Episode V - The Empire Strikes Back","Year":"1980","imdbID":"tt0080684","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},{"Title":"Star Wars: Episode VI - Return of the Jedi","Year":"1983","imdbID":"tt0086190","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"Star Wars: Episode VII - The Force Awakens","Year":"2015","imdbID":"tt2488496","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg"},{"Title":"Star Wars: Episode I - The Phantom Menace","Year":"1999","imdbID":"tt0120915","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"Star Wars: Episode III - Revenge of the Sith","Year":"2005","imdbID":"tt0121766","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg"},{"Title":"Star Wars: Episode II - Attack of the Clones","Year":"2002","imdbID":"tt0121765","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"},{"Title":"Star Trek","Year":"2009","imdbID":"tt0796366","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg"},{"Title":"Star Wars: Episode VIII - The Last Jedi","Year":"2017","imdbID":"tt2527336","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"},{"Title":"Rogue One: A Star Wars Story","Year":"2016","imdbID":"tt3748528","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg"}],"totalResults":"2935","Response":"True"};
    const index = getRandomIndex(AppOptions.rndreq.length);
    const arr = AppOptions.rndreq[index].Search;

    this.addNewSlides(arr);
  }
    

  async loadMovieCardsByRequest (searchString, pageNum = 1) {

    const searchUrl = `${AppOptions.API_URL}${AppOptions.API_KEY}&page=${pageNum}&s=${searchString}`;

    const res = await fetch(searchUrl);
    const data = await res.json();
    
    // {"Response":"False","Error":"Too many results."}
    if (data.Error) {
      console.log(data.Error);
      return;
    }
    
    console.log(data.Search[0].Title);
    console.log(data.Search.length);
    this.lastRequestResult = data.Search.length;

    if (this.lastRequestResult) {
      this.slider.innerHTML = '';
      this.addNewSlides(data.Search);
    }

  }
}