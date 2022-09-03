import { createElement } from '../utils/element_utils';
import proto from '../utils/table_data_proto';
import events from './events';

const columnsSrc = proto.fakeColumns;
const rowsSrc = proto.fakeRows;

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
  addEvents(cellInput, globalInput);
}

function addEvents(cellInput, globalInput) {
  events.onCellBlurred(cellInput, globalInput);
  events.onCellFocus(cellInput, globalInput);
  events.onCellKeyDown(cellInput, globalInput);
  events.onGlobalInputBlurred(globalInput);
  events.onGlobalInputKeydown(globalInput);
}