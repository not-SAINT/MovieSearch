import { KEYS, KEYS_COMMON } from './keys-template';

const KEY_SIZE = 50;
const pressedKeys = new Set();

const EXCLUDE_KEYIDS = ['comma', 'period', 'semicolon', 'quote', 'bracketleft', 'bracketright', 'backquote'];

let CAPS = false;
let SHIFT = false;
let LANG = 'en';
let INPUT;
let KEYBOARD;

const saveState = () => {
  localStorage.setItem('keyboard-lang', LANG);
};

const restoreState = () => {
  LANG = (localStorage.getItem('keyboard-lang')) ? localStorage.getItem('keyboard-lang') : 'en';
};

const generateCommonKeyInnerHtml = (keyValue, keyAltValue) => `<pre>${keyAltValue}<br>  ${keyValue.toUpperCase()}</pre>`;

const switchKey = (lang, keyId) => {
  if (lang === 'en') return generateCommonKeyInnerHtml(KEYS_COMMON[keyId].val, KEYS_COMMON[keyId].alt);

  return generateCommonKeyInnerHtml(KEYS_COMMON[keyId].val2, KEYS_COMMON[keyId].alt2);
};

const switchKeysLang = (lang) => {
  const keys = document.querySelectorAll('.key-common');

  keys.forEach((key) => {
    const element = key;
    element.innerHTML = switchKey(lang, key.id);
  });
};

const switchLang = () => {
  LANG = (LANG === 'en' ? 'ru' : 'en');
  saveState();
  switchKeysLang(LANG);
};

const getKeyValue = (keyId) => {
  const key = document.querySelector(`#${keyId} pre`);

  if (!key) return null;

  let result = document.querySelector(`#${keyId} pre`).innerText.slice(-1);

  if (SHIFT) {
    if ((LANG === 'en' && keyId.slice(0, 3) !== 'key')
       || (LANG === 'ru' && (keyId.slice(0, 3) !== 'key' && !EXCLUDE_KEYIDS.includes(keyId)))) {
      result = document.querySelector(`#${keyId} pre`).innerText.slice(0, 1);
    }
  }
  return result;
};

const movePositionUp = (cursorPosition) => {
  let newPosition = cursorPosition;
  let postLinesLenght = 0;
  const lines = INPUT.value.split('\n');
  let cursorLineOffset = 0;

  if (lines.length === 1) return 0;

  postLinesLenght = lines[0].length + 1;

  for (let i = 1; i < lines.length; i += 1) {
    if (postLinesLenght + lines[i].length >= cursorPosition) {
      cursorLineOffset = cursorPosition - postLinesLenght;
      if (lines[i - 1].length < cursorLineOffset) {
        newPosition = postLinesLenght - 1;
      } else newPosition = cursorPosition - lines[i - 1].length - 1;
      break;
    } else {
      postLinesLenght += lines[i].length + 1;
    }
  }
  if (newPosition === cursorPosition) {
    newPosition = cursorPosition - lines[lines.length - 1].length - 1;
  }
  if (newPosition < 0) newPosition = 0;

  return newPosition;
};

const movePositionDown = (cursorPosition) => {
  const text = INPUT.value;
  const curLineEnd = text.indexOf('\n', cursorPosition);

  if (cursorPosition === text.length || curLineEnd < 0) return text.length;
  if (curLineEnd > cursorPosition) return curLineEnd;

  return text.indexOf('\n', curLineEnd + 1);
};

const pressedSpecialKey = (keyId) => {
  let cursorPosition = INPUT.selectionStart;
  const cursorPositionEnd = INPUT.selectionEnd;
  const beforeText = INPUT.value.slice(0, cursorPosition);
  const afterText = INPUT.value.slice(cursorPosition);
  const key = document.getElementById(keyId);

  switch (keyId) {
    case 'space':
      INPUT.value = `${INPUT.value.slice(0, cursorPosition)} ${INPUT.value.slice(cursorPositionEnd)}`;
      cursorPosition += 1;
      break;
    case 'capslock':
      CAPS = !CAPS;
      break;
    case 'tab':
      INPUT.value = `${beforeText}\t${afterText}`;
      cursorPosition += 1;
      break;
    case 'backspace':
      if (cursorPositionEnd > cursorPosition) {
        INPUT.value = INPUT.value.slice(0, cursorPosition) + INPUT.value.slice(cursorPositionEnd);
      } else {
        INPUT.value = beforeText.slice(0, -1) + afterText;
        cursorPosition = cursorPosition > 0 ? cursorPosition - 1 : 0;
      }
      break;
    case 'numpadenter':
    case 'enter':
      INPUT.value = `${beforeText}\n${afterText}`;
      cursorPosition += 1;
      break;
    case 'delete':
      if (cursorPositionEnd > cursorPosition) {
        INPUT.value = INPUT.value.slice(0, cursorPosition) + INPUT.value.slice(cursorPositionEnd);
      } else INPUT.value = `${beforeText}${afterText.slice(1)}`;
      break;
    case 'arrowup':
      cursorPosition = movePositionUp(cursorPosition);
      break;
    case 'arrowleft':
      cursorPosition = cursorPosition > 0 ? cursorPosition - 1 : 0;
      break;
    case 'arrowdown':
      cursorPosition = movePositionDown(cursorPosition);
      break;
    case 'arrowright':
      cursorPosition += 1;
      break;
    case 'metaleft':
      switchLang();
      break;
    default:
      key.classList.add('key_selected');
      break;
  }
  INPUT.blur();
  INPUT.focus();
  INPUT.selectionStart = cursorPosition;
  INPUT.selectionEnd = cursorPosition;
};

const pressedCommonKey = (keyId, keyValue) => {
  const cursorPosition = INPUT.selectionStart;
  const beforeText = INPUT.value.slice(0, cursorPosition);
  const afterText = INPUT.value.slice(cursorPosition);

  if (pressedKeys.has('control')) return;

  if (CAPS !== SHIFT) INPUT.value = beforeText + ((keyValue) ? keyValue.toUpperCase() : '') + afterText;
  else INPUT.value = beforeText + ((keyValue) ? keyValue.toLowerCase() : '') + afterText;

  INPUT.blur();
  INPUT.focus();
  INPUT.selectionStart = cursorPosition + 1;
  INPUT.selectionEnd = cursorPosition + 1;
};

const selectKey = (keyId) => {
  const key = document.getElementById(keyId);
  if (key) {
    switch (keyId) {
      case 'capslock':
        if (CAPS) key.classList.add('key_selected');
        break;
      default:
        key.classList.add('key_selected');
        break;
    }
  }
};

const pressKey = (keyId) => {
  const key = document.getElementById(keyId);
  if (key) key.classList.add('key_pressed');
};

const unpressKey = (keyId) => {
  const key = document.getElementById(keyId);
  if (key) key.classList.remove('key_pressed');
};

const unselectKey = (keyId) => {
  const key = document.getElementById(keyId);
  if (key) {
    switch (keyId) {
      case 'capslock':
        if (!CAPS) key.classList.remove('key_selected');
        break;
      default:
        key.classList.remove('key_selected');
        break;
    }
  }
};

const addPressedCtrl = (keyId) => {
  if (keyId === 'controlleft' || keyId === 'controlright') pressedKeys.add(keyId.slice(0, 7));
};

const delPressedCtrl = (keyId) => {
  if (keyId === 'controlleft' || keyId === 'controlright') pressedKeys.delete(keyId.slice(0, 7));
};

const onMouseUp = (event) => {
  const keyId = event.target.closest('div').id;
  if (keyId !== 'keyboard') {
    unselectKey(keyId);
    unpressKey(keyId);
    delPressedCtrl(keyId);
  }

  if (keyId === 'shiftleft' || keyId === 'shiftright') SHIFT = false;
};

const onMouseDown = (event) => {
  const keyId = event.target.closest('div').id;
  if (keyId !== 'keyboard') {
    selectKey(keyId);
    pressKey(keyId);
    addPressedCtrl(keyId);
    if (keyId === 'shiftleft' || keyId === 'shiftright') SHIFT = true;
  }
};

const onMouseOut = (event) => {
  if (event.fromElement && event.toElement && event.fromElement.id && event.toElement.id) {
    const keyId = event.target.closest('div').id;
    if (keyId !== 'capslock') {
      unpressKey(keyId);
      unselectKey(keyId);
      delPressedCtrl(keyId);
    }
    if (keyId === 'shiftleft' || keyId === 'shiftright') SHIFT = false;
  }
};

const onClick = (event) => {
  const elementId = event.target.closest('div').id;
  const elementType = event.target.closest('div').getAttribute('keyType');

  if (elementId !== 'keyboard') {
    if (elementType === 'common') {
      pressedCommonKey(elementId, getKeyValue(elementId));
    }
    if (elementType === 'special') pressedSpecialKey(elementId);
    if (CAPS) selectKey(elementId);
    else unselectKey(elementId);
  }
};

const createBase = (container, input) => {
  INPUT = document.querySelector(input);
  KEYBOARD = document.querySelector(container);
  KEYBOARD.addEventListener('click', onClick);
  KEYBOARD.addEventListener('mousedown', onMouseDown);
  KEYBOARD.addEventListener('mouseup', onMouseUp);
  KEYBOARD.addEventListener('mouseout', onMouseOut);
};

const createKey = (key) => {
  const elem = document.createElement('div');
  const keySize = key.size ? key.size : 1;
  const keyType = key.type ? key.type : 'common';

  elem.classList.add('key');
  elem.style.height = `${KEY_SIZE}px`;
  elem.style.width = `${KEY_SIZE * keySize}px`;
  elem.setAttribute('keyType', keyType);

  if (keyType === 'common') {
    elem.classList.add('key-common');
    elem.innerHTML = switchKey(LANG, key.id);
  } else if (key.id !== 'lang') elem.innerHTML = `<span>${key.val}</span>`;
  else elem.innerHTML = `<span>${LANG}</span>`;

  elem.id = key.id;

  document.getElementById('keyboard').append(elem);
};

const createKeys = (keys) => {
  keys.forEach((key) => {
    createKey(key);
  });
};

const createKeyboard = (container, input) => {
  restoreState();
  createBase(container, input);
  createKeys(KEYS);
};

export default createKeyboard;
