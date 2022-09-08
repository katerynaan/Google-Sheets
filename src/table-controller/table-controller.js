import { createElement } from '../utils/element_utils';
import { renderColumns } from './table-columns';
import { renderRows } from './table-rows';

import './table-controller.css';
import { renderExistingStorageData } from './utils/storage';

export default class Table {
  constructor(root) {
    this.root = root;
    this.render();
  }
  render() {
    const table = createElement('div', 'table-wrapper');
    const columns = createElement('div', 'table_columns');
    const rows = createElement('div', 'table_rows');
    renderColumns(columns);
    renderRows(rows);
    table.append(columns, rows);
    this.root.append(table);
    renderExistingStorageData();
    initSelectedCell();
  }
}

function initSelectedCell() {
  const A1 = document.getElementsByClassName('input_A1')[0];
  A1.focus();
}
