import { createElement } from '../utils/element_utils';
import GlobalInput from './global-input';
import './header.css';

export default class Header {
  constructor(root) {
    this.root = root;
    this.render();
  }
  render() {
    const header = createElement('div', 'header-wrapper');
    const cellSelected = createElement('input', 'cell-selected');
    cellSelected.type = 'text';
    const fx = createElement('p', 'formula-icon');
    fx.textContent = 'fx';
    header.append(cellSelected, fx);
    new GlobalInput(header);
    this.root.appendChild(header);
  }
}
