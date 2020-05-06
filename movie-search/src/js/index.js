// import 'swiper.css';

// import 'Utilities/swiper.min.css';
// import '@/../node_modules/swiper/css/swiper.min.css';

import '../css/swiper.min.css';
import '../css/style.css';
import '../css/style.scss';

import Swiper from 'swiper';

import * as AppOptions from './options';
import * as Worker from './worker';
import MovieSearch from './app';

let APP = {};
let SLIDER = {};
let INPUT = {};

// const hideSlides = () => {
//   document.querySelectorAll('.movie-card').forEach(n => n.classList.add('movie-card__hide'));
// }

const showSlides = () => {
  document.querySelectorAll('.movie-card').forEach(n => n.classList.add('movie-card__show'));
  // setTimeout(() => {
  //   console.log('show delay');
    
  // }, 10000);
}

const hideSlides = () => {
  document.querySelectorAll('.movie-card').forEach(n => n.classList.remove('movie-card__show'));
}

const updateSlider = () => {
  console.log('update slider');  
  SLIDER.update();
  SLIDER.navigation.update();
  showSlides();
}

const startAnimateSearching = () => {
  document.getElementById('loupe').classList.add('loupe-searching');
}

const nextSlide = () => {
  if (APP.currPage < APP.lastSearchPageCount) {
    SLIDER.slideNext();
  }
}

const nextDefaultSlides = () => {
  APP.loadDefaultMovieCards();
  updateSlider();
  showSlides();
  nextSlide();
}


const showMoreResults = () => {    
  console.log('showMoreResults =>');
  
  const searchString = INPUT.value;
  if (!searchString) {
    nextDefaultSlides();
    return;
  }

  startAnimateSearching();
  
  APP.getMovieCards(searchString, true)
    .then( () => {
      console.log(`after showMoreResults =>`);
      
      updateSlider();
      
      // SLIDER.navigation.update();
      nextSlide();
    });
}



const searchMovies = () => {
  const searchString = document.getElementById('searchinput').value; 
  hideSlides(); 
  
  if (!searchString) {
    nextDefaultSlides();    
    return;
  }
  
  startAnimateSearching();

  let promise = {};

  if (Worker.isCyrilic(searchString)) {    
    promise = APP.translateAndSearch(searchString);
  } else {
    promise = APP.getMovieCards(searchString);
  }

  promise 
    .then(() => {
      console.log(`searchMovies end =>`);      
      updateSlider();
    });

}

const setFocusOnInput = () => {
  document.getElementById('searchinput').focus();
}

const buildSlider = () => {
  SLIDER = new Swiper (AppOptions.SLIDER_CLASS, {
    slidesPerView: 4,
    // slidesOffsetBefore: 30,
    // slidesOffsetAfter: 30,
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    initialSlide: 0,
    effect: 'slide', // "slide", "fade", "cube", "coverflow" or "flip"
    watchOverflow: true,
    spaceBetween: AppOptions.CARUSEL_GAP,
    breakpoints: AppOptions.CARUSEL_BREAK_POINTS,
    grabCursor: true,


    // experimental
    observer: true,
    roundLengths: true,
    // preventInteractionOnTransition: true,
    centerInsufficientSlides: true,


    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      dynamicBullets: true,
      clickable: true,
      // dynamicMainBullets: 7
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
    on: {
      reachEnd: () => {
        console.log('onReachEnd');
        if (APP.loadDefaultMovieCards) {
          showMoreResults(); 
          // updateSlider();
        }          
      }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  });
};


const onKeyUp = (event) => {
  const { key } = event;
  if (key !== 'Enter') {    
    return;
  }

  const searchString = INPUT.value;
  if (!searchString) {
    return;
  } 

  startAnimateSearching();
  // if (Worker.isCyrilic(searchString)) {    
  //   APP.translateAndSearch(searchString);
  // } else {
  //   APP.getMovieCards(searchString);
  // }
  searchMovies();
};

const onClickSearch = () => {
  searchMovies();
}

const setHandlers = () => {
  document.getElementById('searchbtn').addEventListener('click', onClickSearch);

  document.addEventListener('keyup', onKeyUp);
  // document.getElementById('updateslider').addEventListener('click', updateSlider);
  // document.addEventListener('keydown', onKeyDown);



}


window.onload = () => {
  setHandlers();
  buildSlider();
  APP = new MovieSearch(SLIDER);
  APP.loadDefaultMovieCards();
  INPUT = document.getElementById('searchinput');
  
  setFocusOnInput();
  showSlides();



}