import { createElement } from '../utils/element_utils';
import proto from '../utils/table_data_proto';

const _ = require('lodash');

const columnsSrc = proto.fakeColumns;
const rowsSrc = proto.fakeRows;

const operators = ['+', '-', '/', '*'];
const calc = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

export function renderRows(root) {
  rowsSrc.forEach((row) => {
    const { value } = row;
    const rowElement = createElement('div', `row-cell ${value}`);
    renderCells(rowElement, row);
    root.appendChild(rowElement);
  });
}

function renderCells(rowElement, row) {
  columnsSrc.forEach((column, i) => {
    const cell = createElement('div', `cell ${column.value}${row.value}`);
    if (i === 0) {
      const label = createElement('p', `row-label ${row.value}`);
      label.textContent = row.value;
      cell.appendChild(label);
    } else {
      const input = createElement(
        'input',
        `cell_input input_${column.value}${row.value}`
      );
      input.type = 'text';

      cell.appendChild(input);
      reflectInput(input);
    }
    rowElement.appendChild(cell);
  });
}

function reflectInput(cellInput) {
  const globalInput = document.getElementsByClassName(
    'value-formula-wrapper'
  )[0];
  const newCellItem = {};

  cellInput.addEventListener('blur', () => {
    let existingData = JSON.parse(localStorage.getItem('cellData')) || {};

    let str = cellInput.value;
    syncValues(str, globalInput);
  });

  globalInput.addEventListener('blur', () => {
    let str = globalInput.value;
    const element = document.getElementsByClassName(
      newCellItem.selectedCell
    )[0];
    syncValues(str, element);
  });

  function syncValues(str, output) {
    function reduce() {
      str = str.slice(1);
    }

    if (cellInput.value[0] === '=') {
      newCellItem.formula = cellInput.value;
      if (str[0] == '=') {
        reduce();
      } else {
        calculateFormula();
      }
    } else {
      calculateNums();
    }

    function calculateNums() {
      let left = null;
      let right = '';
      let op = null;
      while (str.length > 0) {
        if (!isNaN(+str[0])) {
          charIsNumber();
        } else if (operators.includes(str[0])) {
          if (left) {
            isLeftOperand();
          } else {
            noLeftOperand();
          }
          right = '';
          op = str[0];
          reduce();
        }
      }
      left ? (output.value = left) : (output.value = cellInput.value);

      function charIsNumber() {
        right = right + str[0];
        if (str.length === 1) {
          isLeftOperand();
        }
        reduce();
      }
      function isLeftOperand() {
        left = calc[op](+left, +right);
      }
      function noLeftOperand() {
        left = right;
      }
    }

    function calculateFormula() {}
  }

  cellInput.addEventListener('keydown', ({ key, keyCode }) => {
    checkValues(cellInput, globalInput, key, keyCode);
  });
  globalInput.addEventListener('keydown', ({ key, keyCode }) => {
    const element = document.getElementsByClassName(
      newCellItem.selectedCell
    )[0];
    checkValues(globalInput, element, key, keyCode);
  });
  cellInput.addEventListener('focus', ({ target }) => {
    newCellItem.selectedCell = target.classList[1];
  });

  function checkValues(source, output, key, keyCode) {
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
}
