import {
  syncInputs,
  calculate,
  removeLastCharOperand,
  removeIfNotFormula,
} from './actions';

let selectedCell;

const onCellBlurred = (cellInput, globalInput) =>
  cellInput.addEventListener('blur', ({ target }) => {
    removeLastCharOperand(target, globalInput);
    console.log('c', calculate(target.value, selectedCell));
  });

const onGlobalInputBlurred = (globalInput) =>
  globalInput.addEventListener('blur', ({ target }) => {
    removeLastCharOperand(target, selectedCell);
    console.log('g', calculate(target.value, selectedCell));
  });

const onCellKeyDown = (cellInput, globalInput) =>
  cellInput.addEventListener('keydown', ({ key, keyCode, target }) => {
    syncInputs(target, globalInput, key, keyCode);
    removeIfNotFormula(target, globalInput, key);
  });

const onGlobalInputKeydown = (globalInput) =>
  globalInput.addEventListener('keydown', ({ key, keyCode }) => {
    syncInputs(globalInput, selectedCell, key, keyCode);
    removeIfNotFormula(target, selectedCell, key);
  });

const onCellFocus = (cellInput, globalInput) =>
  cellInput.addEventListener('focus', ({ target }) => {
    selectedCell = target;
    globalInput.value = cellInput.value;
  });

export default {
  onCellBlurred,
  onCellFocus,
  onCellKeyDown,
  onGlobalInputBlurred,
  onGlobalInputKeydown,
};
