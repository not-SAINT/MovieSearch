import { getRandomIndex } from './worker';
import * as AppOptions from './options';
import MovieCard from './moviecard';


export default class MovieSearch {
  constructor(sliderId) {
    this.sliderId = sliderId;    
    this.lastResultSize = 0;
    this.currPage = 1;
    this.slidesContainer = document.getElementById(sliderId);
    this.errorfield = document.getElementById('errorfield');
    this.lastSearchText = '';
  }

  async getMovieDetails (movieId) {
    const rating = document.getElementById(movieId).lastChild;
      rating.innerText = `x/10`;
    // try {
      
    //   console.log(`ID = ${movieId} start get rating`);
    //   const searchUrl = `${AppOptions.OMDB_API_URL}${AppOptions.OMDB_API_KEY}&i=${movieId}`;
    //   const res = await fetch(searchUrl);
    //   const data = await res.json();
      
    //   console.log(`ID = ${movieId} rating = ${rating}`);
    //   if (data.imdbRating) {
    //     console.log(`ID = ${movieId} rating = ${data.imdbRating}`);
        
    //     rating.innerText = `${data.imdbRating}/10`;

    //     console.log(`ID = ${movieId} after = ${rating.innerText}`);
    //   }      
    // } catch (e) {
    //   console.log(`getMovieDetails error => ${e}`);
      
    //   this.showError(e);
    // }
  }

  addNewSlides (slides) {
    slides.forEach((n) => {
      const card = new MovieCard(n);
      this.slidesContainer.append(card.render());
      if (AppOptions.RATING_ON) {
        this.getMovieDetails(n.imdbID);
      }
    });
  }

  showError(msg) {
    this.errorfield.innerText = msg;
  }

  clearError() {
    this.errorfield.innerText = '';
  }

  loadDefaultMovieCards () {
    const index = getRandomIndex(AppOptions.rndreq.length);
    const arr = AppOptions.rndreq[index].Search;

    if (!arr) {
      this.errorfield.innerText = `${AppOptions.DEFAULT_ERROR} ...`;
      return;
    }

    this.errorfield.innerText = '';
    this.addNewSlides(arr);
  }

  async translateAndSearch (text) {
    try {
      const translateUrl = `${AppOptions.YANDEX_API_URL}${AppOptions.YANDEX_API_KEY}&text=${text}`;

      const res = await fetch(translateUrl);
      const data = await res.json();
      if (data.code === 200 && data.text) {   
        this.currPage = 1;            
        [ this.lastSearchText ] = data.text;
        // console.log(`translate res = ${this.lastSearchText}`);
        this.getMovieCards(this.lastSearchText);
      } 
        // 
      // return 1;
            

    } catch (e) {
      console.log(`getTranslate error => ${e}`);
      this.showError(e);
    }
    return 1;
  }
 
  async getMovieCards (searchString, nextPage = false) {
    try {
      this.currPage = nextPage ? this.currPage + 1 : 1;

      const searchUrl = `${AppOptions.OMDB_API_URL}${AppOptions.OMDB_API_KEY}&page=${this.currPage}&s=${searchString}`;
      const res = await fetch(searchUrl);
      const data = await res.json();
    
    
    
      // {"Response":"False","Error":"Too many results."}
      if (data.Error) {
        // this.errorfield.innerText = `${AppOptions.DEFAULT_ERROR}${searchString}. ${data.Error}`;
        this.showError(`${AppOptions.DEFAULT_ERROR}${searchString}. ${data.Error}`);
        // console.log(data.Error);
        return;
      }
      
      // console.log(data.Search[0].Title);
      // console.log(data.Search.length);
      this.clearError();
      this.lastRequestResult = data.Search.length;
      

      console.log(' lastRequestResult ' + data.Search.length);
      console.log(' this.currPage ' + this.currPage);
      

      if (this.lastRequestResult) {
        if (this.currPage === 1) {
          this.slidesContainer.innerHTML = '';
        }        
        this.addNewSlides(data.Search);
      }
      
    } catch (e) {
      console.log(`loadMovieCardsByRequest error => ${e}`);
      this.showError(e);
    }
  }
}