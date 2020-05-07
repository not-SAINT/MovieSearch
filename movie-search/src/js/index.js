// import 'swiper.css';

// import 'Utilities/swiper.min.css';
// import '@/../node_modules/swiper/css/swiper.min.css';

import '../css/swiper.min.css';
import '../css/style.css';
import '../css/style.scss';

import Swiper from 'swiper';
import Keyboard from 'simple-keyboard';
import keyboardLayoutRus from "simple-keyboard-layouts/build/layouts/russian";
// import keyboardLayoutEng from "simple-keyboard-layouts/build/layouts/english";
import * as AppOptions from './options';
import * as Worker from './worker';
import MovieSearch from './app';

import 'simple-keyboard/build/css/index.css';

let APP = {};
let SLIDER = {};
let INPUT = {};
// let KEYBOARD;
// let KEYBOARD_SHOW = false;
// let KEYBOARD_LANG = false;

// const hideSlides = () => {
//   document.querySelectorAll('.movie-card').forEach(n => n.classList.add('movie-card__hide'));
// }

const showSlides = () => {
  document.querySelectorAll('.movie-card').forEach(n => n.classList.add('movie-card__show'));
  // setTimeout(() => {
  //   console.log('show delay');
    
  // }, 10000);
  console.log('slides showwwwwwwwww ');
  
}

const hideSlides = () => {
  document.querySelectorAll('.movie-card').forEach(n => n.classList.remove('movie-card__show'));
}

// const hideKeyboard = () => {
//   document.getElementById('keyboard').classList.add('simple-keyboard__hide');
//   KEYBOARD_SHOW = true;
// }

// const showKeyboard = () => {
//   document.getElementById('keyboard').classList.remove('simple-keyboard__hide');
//   KEYBOARD_SHOW = false;
// }

const updateSlider = () => {
  console.log('update slider');  
  
  // SLIDER.update();
  // SLIDER.navigation.update();
  // showSlides();
}

const startAnimateSearching = () => {
  document.getElementById('loupe').classList.add('loupe-searching');
}

// const nextSlide = () => {
//   if (APP.currPage < APP.lastSearchPageCount) {
//     SLIDER.slideNext();
//   }
// }

const nextDefaultSlides = () => {
  APP.loadDefaultMovieCards();
  // updateSlider();
  // showSlides();
  // nextSlide();
}


const showMoreResults = () => {    
  console.log('showMoreResults =>');
  
  const searchString = INPUT.value;

  console.log(`showMoreResults searchString => ${searchString}`);

  if (!searchString) {
    console.log(`index.lastSearchText = ${APP.lastSearchText}`);
    
    if (!APP.lastSearchText) {
      nextDefaultSlides();
    }    
    return;
  }

  startAnimateSearching();
  
  APP.getMovieCards(searchString, true)
    .then( () => {
      console.log(`after showMoreResults =>`);
      
      updateSlider();
      
      // SLIDER.navigation.update();
      // nextSlide();
    });
}



const searchMovies = async () => {
  const searchString = document.getElementById('searchinput').value; 
  hideSlides();
  // hideKeyboard(); 
  
  if (!searchString) {
    console.log(`APP.lastSearchTex = ${APP.lastSearchTex}`);
    if (!APP.lastSearchText) {
      nextDefaultSlides();
    }    
    return;
  }
  
  startAnimateSearching();
  // APP.lastSearchText = searchString;

  let promise = {};
  // let promises = [];

  if (Worker.isCyrilic(searchString)) {    
    APP.isCyrillicSearch = true;
    promise = await APP.translateAndSearch(searchString);
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
      updateSlider();
      // showSlides();
      console.log(`searchMovies after updateSlider end =>`);
    });
  showSlides();
  console.log(`searchMovies _____________ end =>`); 

  //  if (Worker.isCyrilic(searchString)) {    
  //   promises.add(APP.translateAndSearch(searchString));
  //   console.log(`translate run`);    
  // } else {
  //   promises.add(APP.getMovieCards(searchString));
  // }

  // Promise.all(promises) 
  //   .then(() => {
  //     console.log(`searchMovies after promise end =>`);      
  //     updateSlider();
  //     console.log(`searchMovies after updateSlider end =>`);
  //   });
  // showSlides();
  // console.log(`searchMovies after showSlides end =>`); 
}

const setFocusOnInput = () => {
  document.getElementById('searchinput').focus();
}


const isNeedPreloadSlides = () => {
  // 4 5 10 => true
  const allSlides = SLIDER.slides.length;
  const currSlide = SLIDER.activeIndex;

  if (allSlides - currSlide <= SLIDER.params.slidesPerView + AppOptions.CARUSEL_PRELOAD_INDEX) {
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

    // // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
    on: {
      // reachEnd: () => {
      //   console.log('onReachEnd');
      //   if (APP.loadDefaultMovieCards) {
      //     showMoreResults(); 
      //     // updateSlider();
      //   }          
      // },
      slideChange: () => {
        // console.log('slideChange=>');
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


// // keyboard
// function handleShiftKeyboard() {
//   const currentLayout = KEYBOARD.options.layoutName;
//   const shiftToggle = currentLayout === "default" ? "shift" : "default";

//   KEYBOARD.setOptions({
//     layoutName: shiftToggle
//   });
// }

// function onChangeKeyboard(input){
//   document.querySelector(".search-input").value = input;
//   KEYBOARD.setInput(input);
//   // console.log("Input changed", input);
// }

// const changeVirtualKeyboardLang = () => {
//   if (KEYBOARD) {   
//     if (KEYBOARD_LANG) {
//       KEYBOARD.setOptions({
//         layout: AppOptions.keyboardLayoutEng
//       });
//       KEYBOARD_LANG = false;
//     } else {
//       KEYBOARD.setOptions({
//         layout: AppOptions.keyboardLayoutRus
//       });
//       KEYBOARD_LANG = true;
//     }    
//     // document.querySelector('[data-skbtn="{switchLang}"]').classList.add('{switchLang}');
//   }
// }

// function onKeyPressKeyboard(button){
//   // console.log("Button pressed", button);
//   if (button === "{shift}" || button === "{lock}") {
//     handleShiftKeyboard();
//   } 
//   if (button === '{switchLang}') {
//     // document.getElementById('test').click();  
//     changeVirtualKeyboardLang(); 
//   }
//   if (button === '{enter}') {
//     onKeyUp({key: 'Enter'});
//   }
// }

// const onKeyboardClick = () => {
//   // console.log('click keyboard');

//   if (!KEYBOARD) {
//     KEYBOARD = new Keyboard({
//       onChange: input => onChangeKeyboard(input),
//       onKeyPress: button => onKeyPressKeyboard(button),
//       layout: AppOptions.keyboardLayoutEng,
//       syncInstanceInputs: true,
//       mergeDisplay: true,
//       display: {
//         '{switchLang}': 'En-Ru',
//         '{space}': 'space',
//       }
//     });
//     KEYBOARD_SHOW = true;    
//   }

//   if (KEYBOARD_SHOW) {
//     showKeyboard();
    
//   } else {
//     hideKeyboard();
//   }  
// }

// const closeVirtualKeyboard = ({target}) => {
//   const keyboardIco = target.closest('.keyboard-ico');
//   // const keyboardIco = target.closest('span');
//   const keyboardBase = target.closest('.simple-keyboard');

//   // if (!((keyboardIco && keyboardIco.classList.contains('keyboard-ico')) || (keyboardBase))) {
//   if (!(keyboardIco || keyboardBase)) {
//     hideKeyboard();
//   }  
// }

const setHandlers = () => {
  document.getElementById('searchbtn').addEventListener('click', onClickSearch);

  document.addEventListener('keyup', onKeyUp);

  // document.querySelector('.swiper-button-next').addEventListener('click', onSlideMoveNext);
  // document.getElementById('keyboardico').addEventListener('click', onKeyboardClick);

  // document.addEventListener('click', closeVirtualKeyboard);

  // document.querySelector('.search-input').addEventListener('input', () => {
  //   if (KEYBOARD) {
  //     const inputText = document.querySelector('.search-input').value;
  //     KEYBOARD.setInput(inputText);
  //   }  
  // });
  
  // document.addEventListener('keydown', onKeyDown);

  // document.getElementById('test').addEventListener('click', onTest);

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