import { createElement } from '../utils/element_utils';
import events from './global-input_events';

class GlobalInput {
  constructor(root) {
    this.root = root;
    this.value;
    this.globalInput;
    this.render();
    this.addEvents();
  }
  render() {
    this.globalInput = createElement('input', 'value-formula-wrapper');
    this.root.append(this.globalInput);
  }
  addEvents() {
    events.onGlobalInputBlurred(this.globalInput);
    events.onGlobalInputKeydown(this.globalInput);
  }
}

export default GlobalInput;
