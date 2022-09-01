import { createElement } from '../utils/element_utils';
import './header.css';

export default class Header {
  constructor(root) {
    this.root = root;
    this.render();
  }
  render() {
    const header = createElement('div', 'header-wrapper');
    const input = createElement('input', 'value-formula-wrapper');
    input.type = 'text';
    const cellSelected = createElement('input', 'cell-selected');
    cellSelected.type = 'text';
    const fx = createElement('p', 'formula-icon');
    fx.textContent = 'fx';
    header.append(cellSelected, fx, input);
    this.root.appendChild(header);
  }
}
