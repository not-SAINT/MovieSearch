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
