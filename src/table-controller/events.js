import {
  syncInputs,
  calculate,
  removeLastCharOperand,
  removeIfNotFormula,
  navigateCells,
} from './actions';

let selectedCell;

const onCellBlurred = (cellInput, globalInput) =>
  cellInput.addEventListener('blur', ({ target }) => {
    removeLastCharOperand(target, globalInput);
    if (target.value[0]) calculate(target.value, target);
  });

const onGlobalInputBlurred = (globalInput) =>
  globalInput.addEventListener('blur', ({ target }) => {
    removeLastCharOperand(target, selectedCell);
    if (target.value[0]) calculate(target.value, target);
  });

const onCellKeyDown = (cellInput, globalInput) =>
  cellInput.addEventListener('keydown', ({ key, keyCode, target }) => {
    if (keyCode >= 37 && keyCode <= 40) navigateCells(target, key);
    else {
      syncInputs(target, globalInput, key, keyCode);
      removeIfNotFormula(target, globalInput, key);
    }
  });

const onGlobalInputKeydown = (globalInput) =>
  globalInput.addEventListener('keydown', ({ key, keyCode, target }) => {
    syncInputs(globalInput, selectedCell, key, keyCode);
    removeIfNotFormula(target, selectedCell, key);
  });

const onCellFocus = (cellInput, globalInput) =>
  cellInput.addEventListener('focus', ({ target }) => {
    globalInput.value = target.value;
    selectedCell = target;
  });

export default {
  onCellBlurred,
  onCellFocus,
  onCellKeyDown,
  onGlobalInputBlurred,
  onGlobalInputKeydown,
};
