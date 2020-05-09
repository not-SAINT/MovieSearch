import '../css/swiper.min.css';
import '../css/keyboard.css';
import '../css/style.css';
import '../css/style.scss';

import Swiper from 'swiper';
import * as AppOptions from './options';
import * as Animation from './animation';
import * as Worker from './worker';
import MovieSearch from './app';
import createKeyboard from './keyboard';

let APP = {};
let SLIDER = {};
let INPUT = {};
let KEYBOARD_SHOW = true;

const showMoreResults = () => {    
  if (AppOptions.SAVEAPIKEY_MODE_ON) {    
    APP.loadDefaultMovieCards();
    return;
  }
  
  const searchString = INPUT.value;

  Animation.startAnimateSearching();  
  APP.getMovieCards(searchString, true);
}

const searchMovies = async () => {
  const searchString = INPUT.value;
    
  if (!searchString) {
    return;
  }

  Animation.hideSlides();  
  Animation.startAnimateSearching();

  if (Worker.isCyrilic(searchString)) {    
    APP.isCyrillicSearch = true;
    await APP.translateSearchText(searchString);
  }
   else {
    APP.isCyrillicSearch = false;
  }

  APP.getMovieCards(searchString);
  Animation.showSlides();
}

const isNeedPreloadSlides = () => {
  const allSlides = SLIDER.slides.length;
  const currSlide = SLIDER.activeIndex;

  if (allSlides === 0) {
    return false;
  }

  if (allSlides - currSlide <= SLIDER.params.slidesPerView + AppOptions.CARUSEL_PRELOAD_INDEX) {    
    return true;
  }

  return false;
}

const buildSlider = () => {
  SLIDER = new Swiper (AppOptions.SLIDER_CLASS, {
    slidesPerView: 4,
    direction: 'horizontal',
    loop: false,
    initialSlide: 0,
    effect: 'slide',
    watchOverflow: true,
    spaceBetween: AppOptions.CARUSEL_GAP,
    breakpoints: AppOptions.CARUSEL_BREAK_POINTS,
    grabCursor: true,
    observer: true,
    roundLengths: true,
    centerInsufficientSlides: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: () => {
        if (isNeedPreloadSlides()) {
          showMoreResults();
        }  
      },
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

  searchMovies();
};

const onClickSearch = () => {
  searchMovies();
}

const onKeyPressKeyboard = () => {
  searchMovies();
  KEYBOARD_SHOW = Animation.disappearKeyboard();
}

const onKeyboardIcoClick = () => {
  if (!KEYBOARD_SHOW) {
    KEYBOARD_SHOW = Animation.disappearKeyboard();    
  } else {
    KEYBOARD_SHOW = Animation.showKeyboard();    
  }  
}

const closeVirtualKeyboard = ({target}) => {
  const keyboardIco = target.closest('.keyboard-ico');
  const keyboardBase = target.closest('.keyboard-wrapper');

  if (!(keyboardIco || keyboardBase)) {
    KEYBOARD_SHOW = Animation.disappearKeyboard();
  }  
}

const onKeyboardTransitionend = () => {
  if (KEYBOARD_SHOW) {
    Animation.hideKeyboard();  
  }   
}

const setHandlers = () => {
  document.getElementById('searchbtn').addEventListener('click', onClickSearch);
  document.addEventListener('keyup', onKeyUp);
  document.getElementById('keyboardico').addEventListener('click', onKeyboardIcoClick);
  document.getElementById('enter').addEventListener('click', onKeyPressKeyboard);
  document.addEventListener('click', closeVirtualKeyboard);  
  document.getElementById('keyboard').addEventListener('transitionend', onKeyboardTransitionend);
}

window.onload = () => {  
  buildSlider();

  APP = new MovieSearch(SLIDER);
  const restoredObject = Worker.restoreFromLocalStorage(AppOptions.LAST_SEARCH_KEY);

  if (restoredObject) {
    APP.loadDefaultMovieCards(restoredObject.lastSearchText);
  } else {
    APP.loadDefaultMovieCards();
  }
    
  INPUT = document.getElementById('searchinput');
  INPUT.focus();
  
  Animation.showSlides();
  createKeyboard('.keyboard-wrapper', '.search-input');
  setHandlers();
}