export const showSlides = () => {  
  setTimeout(() => {
    document.querySelectorAll('.movie-card').forEach(n => n.classList.add('movie-card__show'));
  }, 0); 
}

export const hideSlides = () => {
  document.querySelectorAll('.movie-card').forEach(n => n.classList.remove('movie-card__show'));
}

export const disappearKeyboard = () => {
  document.getElementById('keyboard').classList.add('keyboard-wrapper__disappear');
  return true;
}

export const hideKeyboard = () => {
  document.getElementById('keyboard').classList.add('keyboard-wrapper__hide');
}

export const showKeyboard = () => {
  document.getElementById('keyboard').classList.remove('keyboard-wrapper__hide');
  setTimeout(() => {
    document.getElementById('keyboard').classList.remove('keyboard-wrapper__disappear');
  }, 0);
  return false;
}

export const startAnimateSearching = () => {
  document.getElementById('loupe').classList.add('loupe-searching');
}

export const endSearching = () => {
  document.getElementById('loupe').classList.remove('loupe-searching');
}