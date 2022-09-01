import { toArray } from './converters';
const _ = require('lodash');

const operators = ['+', '-', '/', '*'];
const calc = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

export function calculate(string) {
  let array = [];
  if (string[0] === '=') {
    string = string.slice(1);
  }
  array = toArray(string);
  console.log('final array: ', array);
}

export function syncInputs(source, output, key, keyCode) {
  const printValue = _.debounce(() => {
    if (key === 'Enter') {
      source.blur();
    } else if (keyCode === 32) {
      source.value = source.value.slice(0, -1);
    }
  }, 100);

  printValue();

  const setGlobalValue = _.debounce(() => {
    output.value = source.value;
  }, 200);

  setGlobalValue();
}

export function removeLastCharOperand(target, output) {
  const removeLastOperand = _.debounce(() => {
    if (operators.includes(target.value[target.value.length - 1])) {
      target.value = target.value.slice(0, -1);
      output.value = target.value;
    }
  }, 100);
  removeLastOperand();
}

export function removeIfNotFormula(target, output, key) {
  const removeNotFormula = _.debounce(() => {
    if (operators.includes(key) && target.value[0] !== '=') {
      target.value = '=' + target.value;
      output.value = target.value;
    }
  }, 100);
  removeNotFormula();
}

export function addFormulaToStorage(formulaItem) {
  const cell_data = JSON.parse(localStorage.getItem('cell_data')) || {
    formulas: [],
    numbers: [],
  };
  cell_data.formulas.push(formulaItem);
  localStorage.setItem('cell_data', currentFormulas);
}
