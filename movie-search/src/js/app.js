import { getRandomIndex } from './worker';
import * as AppOptions from './options';
import MovieCard from './moviecard';

const endSearching = () => {
  document.getElementById('loupe').classList.remove('loupe-searching');
}

export default class MovieSearch {
  constructor(slider) {
    this.slider = slider;    
    this.lastResultSize = 0;
    this.currPage = 1;
    // this.slidesContainer = document.getElementById(sliderId);
    this.errorfield = document.getElementById('errorfield');
    this.lastSearchText = '';
    this.lastSearchPageCount = 0;
    // this.searchString = '';
  }

  async getMovieDetails (movieId) {
    const rating = document.getElementById(movieId).lastChild;
    rating.innerText = `x/10`;
    try {
      
      // console.log(`ID = ${movieId} start get rating`);
      const searchUrl = `${AppOptions.OMDB_API_URL}${AppOptions.OMDB_API_KEY}&i=${movieId}`;
      const res = await fetch(searchUrl);
      const data = await res.json();
      
      // console.log(`ID = ${movieId} rating = ${rating}`);
      if (data.imdbRating) {
        // console.log(`ID = ${movieId} rating = ${data.imdbRating}`);
        
        rating.innerText = `${data.imdbRating}/10`;

        // console.log(`ID = ${movieId} after = ${rating.innerText}`);
      }      
    } catch (e) {
      console.log(`getMovieDetails error => ${e}`);
      
      this.showError(e);
    }
  }

  addNewSlides (arr) {
    const newSlides = [];
    arr.forEach((n) => {
      const card = new MovieCard(n);
      // this.slidesContainer.append(card.render());
      newSlides.push(card.render());
      
      // if (AppOptions.RATING_ON) {
      //   this.getMovieDetails(n.imdbID);
      // }
    });
    this.slider.appendSlide(newSlides);
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
      this.clearError();
      const translateUrl = `${AppOptions.YANDEX_API_URL}${AppOptions.YANDEX_API_KEY}&text=${text}`;

      const res = await fetch(translateUrl);
      const data = await res.json();
      if (data.code === 200 && data.text) {   
        this.currPage = 1;            
        [ this.lastSearchText ] = data.text;
        // console.log(`translate res = ${this.lastSearchText}`);
        this.errorfield.innerText = `${AppOptions.DEFAULT_MESSAGE}${this.lastSearchText}`;
        this.getMovieCards(this.lastSearchText);
      } 
        // 
      // return 1;
            

    } catch (e) {
      console.log(`translateAndSearch error => ${e}`);
      endSearching();
      this.showError(e);
    }
    // return 1;
  }
 
  async getMovieCards (searchString, nextPage = false) {
    // try {      
      this.currPage = nextPage ? this.currPage + 1 : 1;

      // current search reached end
      if (this.currPage !== 1 && this.currPage > this.lastSearchPageCount) {
        console.log(`results reach end`);
        endSearching();
        return;
      }

      const searchUrl = `${AppOptions.OMDB_API_URL}${AppOptions.OMDB_API_KEY}&page=${this.currPage}&s=${searchString}`;
      const res = await fetch(searchUrl);
      const data = await res.json();
    

    
      // {"Response":"False","Error":"Too many results."}
      if (data.Error && this.currPage === 1) {
        // this.errorfield.innerText = `${AppOptions.DEFAULT_ERROR}${searchString}. ${data.Error}`;
        const inputText = document.getElementById('searchinput').value;
        this.showError(`${AppOptions.DEFAULT_ERROR}${inputText}. ${data.Error}`);
        endSearching();
        // console.log(data.Error);
        return;
      }
      
      this.clearError();      

      // убрать когда будет сделан учет всех результатов
      // if (data.Error) {
      //   return;
      // }
      this.lastRequestResult = data.Search.length;      

      console.log(` lastRequestResult ${data.Search.length}`);
      console.log(` this.currPage ${  this.currPage}`);
      

      if (this.lastRequestResult) {
        if (this.currPage === 1) {
          // this.slidesContainer.innerHTML = '';
          this.slider.removeAllSlides();
          this.lastSearchPageCount = Math.ceil(data.totalResults / 10);
          console.log(`this.lastSearchPageCount = ${this.lastSearchPageCount}`);          
        }        
        this.addNewSlides(data.Search);
        endSearching();
      }

    // } catch (e) {
    //   console.log(`getMovieCards error => ${e}`);
    //   this.showError(e);
    // }
  }
}