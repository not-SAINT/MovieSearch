export const createDomElement = (elementName = 'div', className) => {
  const newElement = document.createElement(elementName);
  if (className) {
    newElement.classList.add(className);
  }

  return newElement;  
}

export const addClassToElement = (selector, className) => {
  document.querySelector(selector).classList.add(className);
  return true;
}

export const removeClassToElement = (selector, className) => {
  document.querySelector(selector).classList.remove(className);
  return false;
}

export const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
}

export const isCyrilic = (text) => {
  return /[а-яё]/i.test(text);
}

export const saveToLocalStorage = (key, value) => {  
  const serialObj = JSON.stringify(value);
  localStorage.setItem(key, serialObj);
};

export const restoreFromLocalStorage = (key) => {  
  if (localStorage.getItem(key)) {  
    return JSON.parse(localStorage.getItem(key));
  }  
  return undefined;
};