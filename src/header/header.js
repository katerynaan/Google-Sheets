import { createElement } from '../utils/element_utils';
import GlobalInput from './global-input';
import './header.css';
import LoginBar from './login-bar';

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
    new LoginBar(header);
    this.root.appendChild(header);
  }
  remove() {
    const instance = document.getElementsByClassName('header-wrapper')[0];
    instance.remove();
  }
}
