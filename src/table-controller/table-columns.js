import { createElement } from '../utils/element_utils';
import proto from '../utils/table_data_proto';

const columnsSrc = proto.fakeColumns;

export function renderColumns(root) {
  columnsSrc.forEach((column) => {
    const { value } = column;
    const columnElement = createElement('div', `column-cell ${value}`);
    const labelElement = createElement('p', 'column-label');
    labelElement.textContent = value;
    columnElement.appendChild(labelElement);
    root.appendChild(columnElement);
  });
}
