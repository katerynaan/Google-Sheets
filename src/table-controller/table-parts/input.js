import { createElement } from '../../utils/element_utils';
import { toArray } from '../utils/converters';
import { calculate } from '../utils/input-actions';
import globalReducer from '../utils/redux/global-reducer';
import { updateReferenceValue } from '../utils/redux/slices/referencesSlice';
import events from './cell_events';

class Input {
  constructor(root, column, row) {
    this.root = root;
    this.column = column;
    this.row = row;
    this.input;
    this.referencers = {};
    this.render();
    this.setInitialValue();
  }
  render() {
    this.input = createElement(
      'input',
      `cell_input input_${this.column.value}${this.row.value}`
    );
    this.input.type = 'text';
    this.root.append(this.input);
  }
  setInitialValue() {
    globalReducer.subscribe(() => {
      const cell_data = globalReducer.getState().cellData.value;
      if (cell_data) {
        for (let cell in cell_data['numbers']) {
          if (this.column.value + this.row.value + '' === cell) {
            this.input.value = cell_data['numbers'][cell];
          }
        }
        for (let cell in cell_data['formulas']) {
          if (this.column.value + this.row.value + '' === cell) {
            calculate(cell_data['formulas'][cell], this.input);
          }
        }
      }
    });
  }
  reflectInput(cell) {
    const globalInput = document.getElementsByClassName(
      'value-formula-wrapper'
    )[0];
    this.addEvents(globalInput, cell);
  }
  addReferencer(referencer) {
    this.referencers[referencer] = true;
  }
  addEvents(globalInput, cell) {
    events.onCellBlurred(this.input, globalInput, this.addReferencer);
    events.onCellFocus(this.input, globalInput);
    events.onCellKeyDown(this.input, globalInput);
    events.onSelect(this.input, cell);
  }
}

export default Input;
