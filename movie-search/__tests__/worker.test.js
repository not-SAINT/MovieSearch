const worker = require('../src/js/worker');

describe('isCyrilic function', () => {
  test('it should return false for string with only latin characters', () => {
    expect(worker.isCyrilic('fgdfhgkjdfg')).toBeFalsy();
  });
  test('it should return true for string with cyrilic or other characters', () => {
    expect(worker.isCyrilic('567ап')).toBeTruthy();
    expect(worker.isCyrilic('тестовая строчка')).toBeTruthy();
  });
});

describe('createDomElement function', () => {
  test('it should create element div without a given type of element and with class = testclass ', () => {
    const newElement = worker.createDomElement(undefined, 'testclass');

    expect(newElement.nodeName).toEqual('DIV');
    expect(newElement.classList.contains('testclass')).toBeTruthy();
  });

  test('it should create element img and without any class', () => {
    const newElement = worker.createDomElement('img');

    expect(newElement.nodeName).toEqual('IMG');
    expect(newElement.classList.length).toEqual(0);
  });
});
