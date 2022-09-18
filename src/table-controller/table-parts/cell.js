import { createElement } from '../../utils/element_utils';
import Input from './input';

class Cell {
  constructor(root, column, row, i) {
    this.root = root;
    this.column = column;
    this.row = row;
    this.i = i;
    this.cell;
    this.input;
    this.renderCell();
  }
  renderCell() {
    this.cell = createElement(
      'div',
      `cell ${this.column.value}${this.row.value}`
    );
    if (this.i === 0) {
      const label = createElement('p', `row-label ${this.row.value}`);
      label.textContent = this.row.value;
      this.cell.appendChild(label);
    } else {
      this.input = new Input(this.cell, this.column, this.row);
    }
    this.root.appendChild(this.cell);
    if (this.input) this.input.reflectInput(this.cell);
  }
}

export default Cell;
