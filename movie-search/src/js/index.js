// import 'swiper.css';

// import 'Utilities/swiper.min.css';
// import '@/../node_modules/swiper/css/swiper.min.css';

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
    console.log(`index.js => load dev mode`);
    
    APP.loadDefaultMovieCards();
    return;
  }
  console.log('showMoreResults =>');
  
  const searchString = INPUT.value;

  console.log(`showMoreResults searchString => ${searchString}`);

  Animation.startAnimateSearching();
  
  APP.getMovieCards(searchString, true)
    .then( () => {
      console.log(`after showMoreResults =>`);
      
      // updateSlider();
      
      // SLIDER.navigation.update();
      // nextSlide();
    });
}



const searchMovies = async () => {
  const searchString = document.getElementById('searchinput').value; 
  
  // KEYBOARD_SHOW = Animation.hideKeyboard(); 
  
  if (!searchString) {
    console.log(`APP.lastSearchTex = ${APP.lastSearchTex}`);
    // if (!APP.lastSearchText) {
    //   nextDefaultSlides();
    // }    
    return;
  }

  Animation.hideSlides();  
  Animation.startAnimateSearching();
  // APP.lastSearchText = searchString;

  let promise = {};
  // let promises = [];

  if (Worker.isCyrilic(searchString)) {    
    APP.isCyrillicSearch = true;
    promise = await APP.translateSearchText(searchString);
    console.log(`translate run`);
  }
   else {
    APP.isCyrillicSearch = false;
    // promise = APP.getMovieCards(searchString);
  }
  console.log(`APP.lastSearchText =>> ${APP.lastSearchText}`);
  console.log(`APP.isCyrillicSearch =>> ${APP.isCyrillicSearch}`);
  

  promise = APP.getMovieCards(searchString);

  promise 
    .then(() => {
      console.log(`searchMovies after promise end =>`);      
      // updateSlider();
      // Animation.showSlides();
      console.log(`searchMovies after updateSlider end =>`);
    });
  Animation.showSlides();
  console.log(`searchMovies _____________ end =>`); 
}

const setFocusOnInput = () => {
  document.getElementById('searchinput').focus();
}


const isNeedPreloadSlides = () => {
  const allSlides = SLIDER.slides.length;
  const currSlide = SLIDER.activeIndex;

  console.log(`isNeedPreloadSlides ---- allSlides = ${allSlides} currSlide = ${currSlide}`);
  if (allSlides === 0) {
    return false;
  }

  if (allSlides - currSlide <= SLIDER.params.slidesPerView + AppOptions.CARUSEL_PRELOAD_INDEX) {
    console.log(`isNeedPreloadSlides ---- ${allSlides - currSlide} <= ${SLIDER.params.slidesPerView + AppOptions.CARUSEL_PRELOAD_INDEX}`);
    
    return true;
  }

  return false;
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
    on: {
      slideChange: () => {
        console.log(`SLIDER.activeIndex = ${SLIDER.activeIndex}`);
        if (isNeedPreloadSlides()) {
          console.log('isNeedPreloadSlides');    
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
  
  // document.addEventListener('keydown', onKeyDown);

  document.getElementById('keyboard').addEventListener('transitionend', onKeyboardTransitionend);


}

window.onload = () => {
  
  buildSlider();
  APP = new MovieSearch(SLIDER);
  const restoredObject = Worker.restoreFromLocalStorage(AppOptions.LAST_SEARCH_KEY);

  // console.log(restoredObject.lastSearchText);

  if (restoredObject) {
    APP.loadDefaultMovieCards(restoredObject.lastSearchText);
  } else {
    APP.loadDefaultMovieCards();
  }
  
  
  INPUT = document.getElementById('searchinput');
  
  setFocusOnInput();
  Animation.showSlides();

  createKeyboard('.keyboard-wrapper', '.search-input');

  setHandlers();
}