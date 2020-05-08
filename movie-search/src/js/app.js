import * as Worker from './worker';
import * as AppOptions from './options';
import * as Animation from './animation';
import MovieCard from './moviecard';

export default class MovieSearch {
  constructor(slider) {
    this.slider = slider;    
    this.lastResultSize = 0;
    this.currPage = 1;
    this.errorfield = document.getElementById(AppOptions.ERROR_FIELD_ID);
    this.lastSearchText = '';
    this.lastSearchPageCount = 0;
    this.isCyrillicSearch = false;
  }

  setMovieRating(movie) {
    try {
        const cards = document.querySelectorAll(`[slideid=${movie.imdbID}]`);
        cards.forEach(card => {
        const cardMovie = card;
        const rating = (movie.imdbRating && movie.imdbRating !== 'N/A') ? `${movie.imdbRating}/10` : 'N/A';
        cardMovie.lastElementChild.innerText = rating;
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
  }

  showError(msg) {
    this.errorfield.innerText = msg;
  }

  clearError() {
    this.errorfield.innerText = '';
  }

  loadSavedMovieCards () {
    const index = Worker.getRandomIndex(AppOptions.rndreq.length);
    const arr = AppOptions.rndreq[index].Search;

    if (!arr) {
      this.errorfield.innerText = `${AppOptions.DEFAULT_ERROR} ...`;
      return;
    }

    this.errorfield.innerText = '';
    this.addNewSlides(arr);
    Animation.showSlides();
  }

  loadDefaultMovieCards (previosSearchText) {
    if (AppOptions.SAVEAPIKEY_MODE_ON) {
      this.loadSavedMovieCards();
    } else {
      const index = Worker.getRandomIndex(AppOptions.START_APP_MOVIES.length);
      const defaultSearchText = previosSearchText || AppOptions.START_APP_MOVIES[index];     

      this.getMovieCards(defaultSearchText);  
    }      
  }

  async translateSearchText (text) {
    try {
      this.clearError();
      const translateUrl = `${AppOptions.YANDEX_API_URL}${AppOptions.YANDEX_API_KEY}&text=${text}`;

      const res = await fetch(translateUrl);
      const data = await res.json();
      if (data.code === 200 && data.text) {   
        this.currPage = 1;            
        [ this.lastSearchText ] = data.text;
        this.errorfield.innerText = `${AppOptions.DEFAULT_MESSAGE}${this.lastSearchText}`;
      } 

    } catch (e) {
      this.showError(e);
    }
  }
 
  async getMovieCards (search, nextPage = false) {
    try {      
      this.currPage = nextPage ? this.currPage + 1 : 1;

      // current search has reached end
      if (this.currPage !== 1 && this.currPage > this.lastSearchPageCount) {
        Animation.endSearching();
        return;
      }

      if (!(nextPage || this.isCyrillicSearch)) {
        this.lastSearchText = search; 
        this.clearError();
      }

      const searchString = this.lastSearchText;
      const searchUrl = `${AppOptions.OMDB_API_URL}${AppOptions.OMDB_API_KEY}&page=${this.currPage}&s=${searchString}`;
      const res = await fetch(searchUrl);
      const data = await res.json();   

      if (data.Error && this.currPage === 1) {
        this.showError(`${AppOptions.DEFAULT_ERROR}${this.lastSearchText}. ${data.Error}`);

        Animation.endSearching();
        return;
      }

      this.lastRequestResult = data.Search.length;     

      if (this.lastRequestResult) {
        if (this.currPage === 1) {
          this.slider.removeAllSlides();
          this.slider.update();
          this.lastSearchPageCount = Math.ceil(data.totalResults / 10);

          Worker.saveToLocalStorage(AppOptions.LAST_SEARCH_KEY, { 'lastSearchText': this.lastSearchText });
        }        
        this.addNewSlides(data.Search);
        Animation.endSearching();
        Animation.showSlides();
      }

    } catch (e) {
      Animation.endSearching();
      this.showError(e);
    }
  }
}