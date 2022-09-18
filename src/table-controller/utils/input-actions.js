import { toArray, reduceSortedArray } from './converters';
import { navigateToNextCell } from './navigation-actions';
const _ = require('lodash');

const operators = ['+', '-', '/', '*', "^", "(", ")"];

export function calculate(string, target) {
  let array = [];
  if (string[0] === '=') {
    string = string.slice(1);
    array = toArray(string);
    if (target) target.value = reduceSortedArray(array);
  }
}

export function syncInputs(source, output, key, keyCode, global) {
  const printValue = _.debounce(() => {
    if (key === 'Enter') {
      //submit the data
      if (global) navigateToNextCell(output);
      else navigateToNextCell(source);
    } else if (keyCode === 32) {
      //remove space at the end of the number
      source.value = source.value.slice(0, -1);
    } else {
      setGlobalValue();
    }
  }, 50);

  const setGlobalValue = _.debounce(() => {
    output.value = source.value;
  }, 100);

  printValue();
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

export function setAsFormula(target, output, key) {
  const removeNotFormula = _.debounce(() => {
    if (
      operators.includes(key) &&
      !(target.value.length == 1 && operators.includes(key)) &&
      target.value[0] !== '='
    ) {
      target.value = '=' + target.value;
      output.value = target.value;
    }
  }, 100);
  removeNotFormula();
}

export function refreshCalculations() {
  const cell_data = JSON.parse(localStorage.getItem('cell_data')) || {
    formulas: {},
    numbers: {},
  };
  for (let cell in cell_data.formulas) {
    const formula = cell_data.formulas[cell];
    calculate(formula, document.getElementsByClassName('input_' + cell)[0]);
  }
  return cell_data;
}

export function displayFormula(target, globalInput) {
  const cellId = target.classList[1].replace('input_', '');
  const cell_data = JSON.parse(localStorage.getItem('cell_data')) || {
    formulas: {},
    numbers: {},
  };
  globalInput.value = cell_data['formulas'][cellId]
    ? cell_data['formulas'][cellId]
    : target.value;
}
