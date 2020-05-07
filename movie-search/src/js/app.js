import { getRandomIndex } from './worker';
import * as AppOptions from './options';
import MovieCard from './moviecard';

const endSearching = () => {
  document.getElementById('loupe').classList.remove('loupe-searching');
}

const showSlides = () => {
  
  setTimeout(() => {
    console.log('show delay');
    document.querySelectorAll('.movie-card').forEach(n => n.classList.add('movie-card__show'));
  }, 0);
  console.log('slides showwwwwwwwww APP');
  
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
    this.isCyrillicSearch = false;
  }

  setMovieRating(movie) {
    try {
        const cards = document.querySelectorAll(`[slideid=${movie.imdbID}]`);
        cards.forEach(card => {
        const cardMovie = card;
        cardMovie.lastElementChild.innerText = `${movie.imdbRating}/10`
      });
    }
    catch (e) {
      this.showError(e);
    }    
  }

  async getMovieRatings(movieIDs) {
    try {
      const movies = [];
      movieIDs.forEach ( id => {
        const movie = fetch(`${AppOptions.OMDB_API_URL}${AppOptions.OMDB_API_KEY}&i=${id}`)
                    .then(
                      (successResponse) => {
                        if (successResponse.status !== 200) {
                          return null;
                        }                         
                        return successResponse.json();                        
                      },
                      () => {
                        return null;
                      }
                    );
        movies.push(movie);
      })

      Promise.allSettled(movies).
        then((results) => {
          results.forEach(movie => this.setMovieRating(movie.value))
        });
    } catch (e) {      
      this.showError(e);
    }
  }

  addNewSlides(arr) {
    const newSlides = [];
    const movieIDs = [];
    arr.forEach((movie) => {
      const card = new MovieCard(movie);
      newSlides.push(card.render());
      movieIDs.push(movie.imdbID);
      
    });

    if (AppOptions.RATING_ON) {
      this.getMovieRatings(movieIDs);
    }
    
    this.slider.appendSlide(newSlides);   
    // showSlides(); 
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
    showSlides();
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
        // this.getMovieCards(this.lastSearchText);
      } 

    } catch (e) {
      console.log(`translateAndSearch error => ${e}`);
      endSearching();
      this.showError(e);
    }
  }
 
  async getMovieCards (search, nextPage = false) {
    // try {      
      this.currPage = nextPage ? this.currPage + 1 : 1;

      // current search reached end
      if (this.currPage !== 1 && this.currPage > this.lastSearchPageCount) {
        console.log(`results reach end`);
        endSearching();
        return;
      }
      console.log(`APP.isCyrillicSearch =>> ${this.isCyrillicSearch}`);

      if (!(nextPage || this.isCyrillicSearch)) {
        console.log(`APP.getMovieCards =>> 1111`);
        this.lastSearchText = search; 
        this.clearError();
      }

      const searchString = this.lastSearchText;
      const searchUrl = `${AppOptions.OMDB_API_URL}${AppOptions.OMDB_API_KEY}&page=${this.currPage}&s=${searchString}`;
      const res = await fetch(searchUrl);
      const data = await res.json();     
    

    
      // {"Response":"False","Error":"Too many results."}
      if (data.Error && this.currPage === 1) {
        // this.errorfield.innerText = `${AppOptions.DEFAULT_ERROR}${searchString}. ${data.Error}`;
        // const inputText = document.getElementById('searchinput').value;
        this.showError(`${AppOptions.DEFAULT_ERROR}${this.lastSearchText}. ${data.Error}`);
        endSearching();
        // console.log(data.Error);
        return;
      }
      
            

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
        showSlides();
      }

    // } catch (e) {
    //   console.log(`getMovieCards error => ${e}`);
    //   this.showError(e);
    // }
  }
}