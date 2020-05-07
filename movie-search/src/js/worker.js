export const createDomElement = (elementName = 'div', className) => {
  const newElement = document.createElement(elementName);
  if (className) {
    newElement.classList.add(className);
  }

  return newElement;  
}

export const addClassToElement = (selector, className, flag) => {
  document.querySelector(selector).classList.add(className);
  return !flag;
}

export const removeClassToElement = (selector, className, flag) => {
  document.querySelector(selector).classList.remove(className);
  return !flag;
}

export const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
}

export const isCyrilic = (text) => {
  return /[а-я]/i.test(text);
}

export const isValidImgSrc = (src, id) => {
  // const img = createDomElement('img');
  let goodSrc = true;

  fetch(src).then(function(response) {
    if (response.status !== 200) {
        console.log(44444444444);
        goodSrc = false;
        
      } else {
          // go the desired response
          console.log(43545);
          
      }
  }).catch(function(err) {
      // some error here
      console.log(`=====>>>${err}`);
      goodSrc = false;
      const img = document.querySelectorAll('.movie-card__link');
      img.src = '../img/noposter.png';
  });

  console.log();
  
  return goodSrc;
}