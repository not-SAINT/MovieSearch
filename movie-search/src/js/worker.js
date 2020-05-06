export const createDomElement = (elementName = 'div', className) => {
  const newElement = document.createElement(elementName);
  if (className) {
    newElement.classList.add(className);
  }

  return newElement;  
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

  // console.log(`checkOnBadSrc => ${src}`);


  // img.onerror = () => {
  //   goodSrc = false;
  //   console.log(`checkOnBadSrc => ${src}`);    
  // }
  // try {
  //   // img.src = src;
  //   const t = fetch(src);
  //   console.log(333);
    
  // } catch (e) {
  //   console.log(`checkOnBadSrc catch => ${src}`);
  //   goodSrc = false;
  // }

  fetch(src).then(function(response) {
    if (response.status !== 200) {
        // make the promise be rejected if we didn't get a 200 response
        // throw new Error("Not 200 response")
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