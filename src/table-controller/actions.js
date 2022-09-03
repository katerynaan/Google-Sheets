import { toArray } from './converters';
const _ = require('lodash');

const operators = ['+', '-', '/', '*'];
const priorityOperators = ['*', '/'];
const calc = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

export function calculate(string, target) {
  let array = [];
  if (string[0] === '=') {
    string = string.slice(1);
    array = toArray(string);
    target.value = reduceSortedArray(array);
  }
}

function reduceSortedArray(
  array = ['12', '+', '8', '/', '2', '-', '6', '*', '2'],
  i = 1,
  passedPriorityOperators
) {
  if (array.length <= 1) return array[0];
  if (i >= array.length && !passedPriorityOperators)
    return reduceSortedArray(array, 1, true);
  if (!passedPriorityOperators) {
    if (priorityOperators.includes(array[i])) {
      const left = +array[i - 1];
      array[i - 1] = calc[array[i]](left, +array[i + 1]);
      array.splice(i, 2);
    }
    return reduceSortedArray(array, i + 2);
  } else {
    const left = +array[0];
    const right = +array[2];
    const op = array[1];
    array = array.slice(2);
    array[0] = calc[op](left, right);
    return reduceSortedArray(array, 1, true);
  }
}

export function syncInputs(source, output, key, keyCode) {
  const printValue = _.debounce(() => {
    if (key === 'Enter') {
      source.blur();
    } else if (keyCode === 32) {
      //remove space at the end of the number
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

export function addFormulaToStorage(formulaItem) {
  const cell_data = JSON.parse(localStorage.getItem('cell_data')) || {
    formulas: [],
    numbers: [],
  };
  cell_data.formulas.push(formulaItem);
  localStorage.setItem('cell_data', currentFormulas);
}

export function navigateCells(targetCell, key) {
  const cellID = targetCell.classList[1].replace('input_', '');
  let newCellId;
  switch (key) {
    case 'ArrowDown':
      newCellId = cellID[0] + (+cellID.slice(1) + 1);
      break;
    case 'ArrowUp':
      newCellId = cellID[0] + (+cellID.slice(1) - 1);
      break;
    case 'ArrowRight':
      newCellId =
        String.fromCharCode(cellID.charCodeAt(0) + 1) + cellID.slice(1);
      break;
    case 'ArrowLeft':
      newCellId =
        String.fromCharCode(cellID.charCodeAt(0) - 1) + cellID.slice(1);
      break;
  }
  const elements = document.getElementsByClassName('input_' + newCellId);
  if (elements.length > 0) {
    elements[0].focus();
  }
}
