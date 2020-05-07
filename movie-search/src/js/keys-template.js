export const KEYS = [
  { id: 'backquote' },
  { id: 'digit1' },
  { id: 'digit2' },
  { id: 'digit3' },
  { id: 'digit4' },
  { id: 'digit5' },
  { id: 'digit6' },
  { id: 'digit7' },
  { id: 'digit8' },
  { id: 'digit9' },
  { id: 'digit0' },
  { id: 'minus' },
  { id: 'equal' },
  {
    id: 'backspace', type: 'special', val: '\u2190Backspace', size: 2.2,
  },
  {
    id: 'tab', type: 'special', val: 'Tab ⇆', alt: '', size: 1.5,
  },
  { id: 'keyq' },
  { id: 'keyw' },
  { id: 'keye' },
  { id: 'keyr' },
  { id: 'keyt' },
  { id: 'keyy' },
  { id: 'keyu' },
  { id: 'keyi' },
  { id: 'keyo' },
  { id: 'keyp' },
  { id: 'bracketleft' },
  { id: 'bracketright' },
  { id: 'backslash' },
  {
    id: 'delete', type: 'special', val: 'DEL', alt: '',
  },
  {
    id: 'capslock', type: 'special', val: 'Caps Lock', alt: '', size: 1.9,
  },
  { id: 'keya' },
  { id: 'keys' },
  { id: 'keyd' },
  { id: 'keyf' },
  { id: 'keyg' },
  { id: 'keyh' },
  { id: 'keyj' },
  { id: 'keyk' },
  { id: 'keyl' },
  { id: 'semicolon' },
  { id: 'quote' },
  {
    id: 'enter', type: 'special', val: 'Enter', alt: '', size: 2,
  },
  {
    id: 'shiftleft', type: 'special', val: '\u21e7 Shift', alt: 'е', size: 2.3,
  },
  { id: 'keyz' },
  { id: 'keyx' },
  { id: 'keyc' },
  { id: 'keyv' },
  { id: 'keyb' },
  { id: 'keyn' },
  { id: 'keym' },
  { id: 'comma' },
  { id: 'period' },
  { id: 'slash' },
  {
    id: 'arrowup', type: 'special', val: '\u02c4', alt: '',
  },
  {
    id: 'shiftright', type: 'special', val: '\u21e7 Shift', alt: '', size: 1.5,
  },
  {
    id: 'controlleft', type: 'special', val: 'Ctrl', alt: '', size: 1.7,
  },
  {
    id: 'metaleft', type: 'special', val: 'En-Ru', alt: '', size: 1.3,
  },
  {
    id: 'altleft', type: 'special', val: 'Alt', alt: '', size: 1.3,
  },
  {
    id: 'space', type: 'special', val: ' ', alt: '', size: 6,
  },
  {
    id: 'altright', type: 'special', val: 'Alt Gr', alt: '', size: 1.3,
  },
  {
    id: 'controlright', type: 'special', val: 'Ctrl', alt: '', size: 1.4,
  },
  {
    id: 'arrowleft', type: 'special', val: '\u02c2', alt: '',
  },
  {
    id: 'arrowdown', type: 'special', val: '\u02c5', alt: '',
  },
  {
    id: 'arrowright', type: 'special', val: '\u02c3', alt: '',
  },
  // {
  //   id: 'lang', type: 'special', val: 'en', alt: '',
  // },
];

export const KEYS_COMMON = {
  backquote: {
    val: '`', alt: '~', val2: 'ё', alt2: ' ',
  },
  digit1: {
    val: '1', alt: '!', val2: '1', alt2: '!',
  },
  digit2: {
    val: '2', alt: '@', val2: '2', alt2: '"',
  },
  digit3: {
    val: '3', alt: '#', val2: '3', alt2: '№',
  },
  digit4: {
    val: '4', alt: '$', val2: '4', alt2: ';',
  },
  digit5: {
    val: '5', alt: '%', val2: '5', alt2: '%',
  },
  digit6: {
    val: '6', alt: '^', val2: '6', alt2: ':',
  },
  digit7: {
    val: '7', alt: '&', val2: '7', alt2: '?',
  },
  digit8: {
    val: '8', alt: '*', val2: '8', alt2: '*',
  },
  digit9: {
    val: '9', alt: '(', val2: '9', alt2: '(',
  },
  digit0: {
    val: '0', alt: ')', val2: '0', alt2: ')',
  },
  minus: {
    val: '-', alt: '_', val2: '-', alt2: '_',
  },
  equal: {
    val: '=', alt: '+', val2: '=', alt2: '+',
  },
  keyq: {
    val: 'q', alt: ' ', val2: 'й', alt2: ' ',
  },
  keyw: {
    val: 'w', alt: ' ', val2: 'ц', alt2: ' ',
  },
  keye: {
    val: 'e', alt: ' ', val2: 'у', alt2: ' ',
  },
  keyr: {
    val: 'r', alt: ' ', val2: 'к', alt2: ' ',
  },
  keyt: {
    val: 't', alt: ' ', val2: 'е', alt2: ' ',
  },
  keyy: {
    val: 'y', alt: ' ', val2: 'н', alt2: ' ',
  },
  keyu: {
    val: 'u', alt: ' ', val2: 'г', alt2: ' ',
  },
  keyi: {
    val: 'i', alt: ' ', val2: 'ш', alt2: ' ',
  },
  keyo: {
    val: 'o', alt: ' ', val2: 'щ', alt2: ' ',
  },
  keyp: {
    val: 'p', alt: ' ', val2: 'з', alt2: ' ',
  },
  bracketleft: {
    val: '[', alt: '{', val2: 'х', alt2: ' ',
  },
  bracketright: {
    val: ']', alt: '}', val2: 'ъ', alt2: ' ',
  },
  backslash: {
    val: '\\', alt: '|', val2: '\\', alt2: '/',
  },
  keya: {
    val: 'a', alt: ' ', val2: 'ф', alt2: ' ',
  },
  keys: {
    val: 's', alt: ' ', val2: 'ы', alt2: ' ',
  },
  keyd: {
    val: 'd', alt: ' ', val2: 'в', alt2: ' ',
  },
  keyf: {
    val: 'f', alt: ' ', val2: 'а', alt2: ' ',
  },
  keyg: {
    val: 'g', alt: ' ', val2: 'п', alt2: ' ',
  },
  keyh: {
    val: 'h', alt: ' ', val2: 'р', alt2: ' ',
  },
  keyj: {
    val: 'j', alt: ' ', val2: 'о', alt2: ' ',
  },
  keyk: {
    val: 'k', alt: ' ', val2: 'л', alt2: ' ',
  },
  keyl: {
    val: 'l', alt: ' ', val2: 'д', alt2: ' ',
  },
  semicolon: {
    val: ';', alt: ':', val2: 'ж', alt2: ' ',
  },
  quote: {
    val: '\'', alt: '"', val2: 'э', alt2: ' ',
  },
  keyz: {
    val: 'z', alt: ' ', val2: 'я', alt2: ' ',
  },
  keyx: {
    val: 'x', alt: ' ', val2: 'ч', alt2: ' ',
  },
  keyc: {
    val: 'c', alt: ' ', val2: 'с', alt2: ' ',
  },
  keyv: {
    val: 'v', alt: ' ', val2: 'м', alt2: ' ',
  },
  keyb: {
    val: 'b', alt: ' ', val2: 'и', alt2: ' ',
  },
  keyn: {
    val: 'n', alt: ' ', val2: 'т', alt2: ' ',
  },
  keym: {
    val: 'm', alt: ' ', val2: 'ь', alt2: ' ',
  },
  comma: {
    val: ',', alt: '<', val2: 'б', alt2: ' ',
  },
  period: {
    val: '.', alt: '>', val2: 'ю', alt2: ' ',
  },
  slash:
  {
    val: '/', alt: '?', val2: '.', alt2: ',',
  },
};

export default KEYS;
