import '../css/style.css';
import '../css/style.scss';

import Glide from '../../node_modules/@glidejs/glide';
import * as AppOptions from './options';
import MovieSearch from './app';

let APP = {};
let SLIDER = {};


const onSearchClick = () => {
  const searchString = document.getElementById('searchinput').value;
  if (!searchString) {
    const cntSlides = document.querySelectorAll('.movie-card').length;
    const curPerView = SLIDER.settings.perView;
    // console.log(curPerView);
    
    SLIDER.destroy();
    APP.loadDefaultMovieCards();

    SLIDER = new Glide(AppOptions.SLIDER_ID, {
      type: 'slider',
      perView: 4,
      gap: AppOptions.CARUSEL_GAP,
      keyboard: true,
      rewind: false,
      bound: true,
      startAt: cntSlides - curPerView,
      breakpoints: {
        800: {
          perView: 1
        }
      }
    }).mount();

    SLIDER.on('run.end', () => {
      console.log('reach end');
      onSearchClick();
    });

    SLIDER.mount();

    return;
  }
  console.log(searchString);

  APP.loadMovieCardsByRequest(searchString);
  
}

const setHandlers = () => {
  document.getElementById('searchbtn').addEventListener('click', onSearchClick);
}

const createSlider = () => {
  SLIDER = new Glide(AppOptions.SLIDER_ID, {
    type: 'slider',
    perView: 4,
    gap: AppOptions.CARUSEL_GAP,
    keyboard: true,
    rewind: false,
    bound: true,
    breakpoints: {
      800: {
        perView: 1
      }
    }
  });


  SLIDER.on('run.end', () => {
    console.log('reach end');
    onSearchClick();
  })

  

  SLIDER.mount();
};

window.onload = () => {
  setHandlers();
  APP = new MovieSearch(AppOptions.SLIDES);
  APP.loadDefaultMovieCards();
  createSlider();  
}