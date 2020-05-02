import '../css/style.css';
import '../css/style.scss';

import Glide from '../../node_modules/@glidejs/glide';
import * as AppOptions from './options';
import * as Worker from './worker';
import MovieSearch from './app';
import HtmlFix from './glidefix';

let APP = {};
let SLIDER = {};
let INPUT = {};

// const hideSlides = () => {
//   document.querySelectorAll('.movie-card').forEach(n => n.classList.add('movie-card__hide'));
// }

const showSlides = () => {
  document.querySelectorAll('.movie-card__hide').forEach(n => n.classList.remove('movie-card__hide'));
  // setTimeout(() => {
  //   console.log('show delay');
    
  // }, 10000);
}

const showMoreResults = () => {
  const searchString = INPUT.value;
  if (!searchString) {
    return;
  }
  // hideSlides();
  SLIDER.destroy();
  APP.getMovieCards(searchString, 1);

  const cntSlides = document.querySelectorAll('.movie-card').length;
  const curPerView = SLIDER.settings.perView;
  // eslint-disable-next-line no-use-before-define
  buildSlider(cntSlides - curPerView);     
}

const searchMovies = () => {
  const searchString = document.getElementById('searchinput').value; 
  // hideSlides(); 
  
  if (!searchString) {
    const cntSlides = document.querySelectorAll('.movie-card').length;
    const curPerView = SLIDER.settings.perView;
    // console.log(curPerView);
    
    SLIDER.destroy();
    APP.loadDefaultMovieCards();

    // eslint-disable-next-line no-use-before-define
    buildSlider(cntSlides - curPerView); 

    // SLIDER = new Glide(AppOptions.SLIDER_ID, {
    //   type: 'slider',
    //   perView: 4,
    //   gap: AppOptions.CARUSEL_GAP,
    //   keyboard: true,
    //   rewind: false,
    //   bound: true,
    //   startAt: cntSlides - curPerView,
    //   breakpoints: {
    //     800: {
    //       perView: 1
    //     }
    //   }
    // })

    // SLIDER.on('run.end', SearchMovies);

    // SLIDER.mount();
    showSlides();
    return;
  }
  // console.log(searchString);

  

  APP.getMovieCards(searchString);  

  showSlides();
}

const setFocusOnInput = () => {
  document.getElementById('searchinput').focus();
}

const buildSlider = (startSlide = 0) => {
  // if (SLIDER) {
  //   SLIDER.destroy();
  // }

  SLIDER = new Glide(AppOptions.SLIDER_ID, {
    type: 'slider',
    perView: 4,
    gap: AppOptions.CARUSEL_GAP,
    keyboard: true,
    rewind: false,
    bound: true,
    startAt: startSlide,
    breakpoints: {
      800: {
        perView: 1
      }
    }
  });
  
  // SLIDER.on('run.end', () => {
  //   // console.log('reach end');
  //   onSearchClick();
  // })
  // SLIDER.on('run.end', searchMovies);  
  SLIDER.on('run.end', showMoreResults);  

  SLIDER.mount({Html: HtmlFix});
};


const onKeyUp = (event) => {
  const { key } = event;
  if (key !== 'Enter') {
    // console.log(INPUT.value);
    
    return;
  }

  const searchString = INPUT.value;
  if (!searchString) {
    return;
  } 

  if (Worker.isCyrilic(searchString)) {
    APP.translateAndSearch(searchString);
    // if (!translate) {
    //   APP.showError(`${AppOptions.DEFAULT_ERROR}${searchString}`);
    // }
    // searchString = translate;
  }

  // searchMovies();

  showSlides();
};

const onClickSearch = () => {
  searchMovies();
}

const updateSlider = () => {
  console.log('update slider');
  
  SLIDER.update();
}

const setHandlers = () => {
  document.getElementById('searchbtn').addEventListener('click', onClickSearch);

  document.addEventListener('keyup', onKeyUp);
  document.getElementById('updateslider').addEventListener('click', updateSlider);
  // document.addEventListener('keydown', onKeyDown);
}


window.onload = () => {
  setHandlers();
  APP = new MovieSearch(AppOptions.SLIDES);
  APP.loadDefaultMovieCards();
  INPUT = document.getElementById('searchinput');
  buildSlider();
  setFocusOnInput();
  showSlides();
}