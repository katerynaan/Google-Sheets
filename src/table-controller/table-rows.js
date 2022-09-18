import { createElement } from '../utils/element_utils';
import proto from '../utils/table_data_proto';
import { renderCells } from './utils/cells-renderer';
import events from './events';

const rowsSrc = proto.fakeRows;

export function renderRows(root) {
  rowsSrc.forEach((row) => {
    const { value } = row;
    const rowElement = createElement('div', `row-cell ${value}`);
    renderCells(rowElement, row);
    root.appendChild(rowElement);
  });
}
