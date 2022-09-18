import proto from '../../utils/table_data_proto';
import { createElement } from '../../utils/element_utils';
import events from '../events';

const columnsSrc = proto.fakeColumns;

export function renderCells(rowElement, row) {
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
      reflectInput(input, cell);
    }
    rowElement.appendChild(cell);
  });
}

function reflectInput(cellInput, cell) {
  const globalInput = document.getElementsByClassName(
    'value-formula-wrapper'
  )[0];
  addEvents(cellInput, globalInput, cell);
}

function addEvents(cellInput, globalInput, cell) {
  events.onCellBlurred(cellInput, globalInput);
  events.onCellFocus(cellInput, globalInput);
  events.onCellKeyDown(cellInput, globalInput);
  events.onGlobalInputBlurred(globalInput);
  events.onGlobalInputKeydown(globalInput);
  events.onSelect(cellInput, cell);
}
