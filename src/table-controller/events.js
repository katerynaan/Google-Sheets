import { copy, paste } from './utils/data-transfer-actions';
import {
  syncInputs,
  calculate,
  removeLastCharOperand,
  setAsFormula,
  displayFormula,
} from './utils/input-actions';
import { navigateCells } from './utils/navigation-actions';
import { setCellDataIntoStorage } from './utils/storage';

let selectedCell;

const onCellBlurred = (cellInput, globalInput) =>
  cellInput.addEventListener('blur', ({ target }) => {
    setCellDataIntoStorage({
      cellId: target.classList[1].replace('input_', ''),
      data: globalInput.value || target.value,
    });
    removeLastCharOperand(target, globalInput);
    if (target.value) calculate(target.value, target);
  });

const onGlobalInputBlurred = (globalInput) =>
  globalInput.addEventListener('blur', ({ target }) => {
    setCellDataIntoStorage({
      cellId: selectedCell.classList[1].replace('input_', ''),
      data: target.value,
    });
    removeLastCharOperand(target, selectedCell);
    if (target.value) calculate(target.value, target);
  });

const onCellKeyDown = (cellInput, globalInput) =>
  cellInput.addEventListener('keydown', (e) => {
    const { key, keyCode, target } = e;
    const isHotKeys = handleHotKeys(e);
    if (!isHotKeys) {
      setAsFormula(target, globalInput, key);
      syncInputs(target, globalInput, key, keyCode);
    }
  });

function handleHotKeys(e) {
  const { key, keyCode, target, ctrlKey } = e;
  let hotKeys = false;
  if (keyCode >= 37 && keyCode <= 40) {
    navigateCells(target, key);
    hotKeys = true;
  } else if (ctrlKey && key == 'c') {
    e.preventDefault();
    copy([target.value, '|', '125', '45', '|', '234']);
    hotKeys = true;
  } else if (ctrlKey && key == 'v') {
    e.preventDefault();
    paste(target);
    hotKeys = true;
  }
  return hotKeys;
}

const onGlobalInputKeydown = (globalInput) =>
  globalInput.addEventListener('keydown', ({ key, keyCode, target }) => {
    setAsFormula(target, selectedCell, key);
    syncInputs(globalInput, selectedCell, key, keyCode);
  });

const onCellFocus = (cellInput, globalInput) =>
  cellInput.addEventListener('focus', ({ target }) => {
    globalInput.value = target.value;
    displayFormula(target, globalInput);
    selectedCell = target;
  });
let start;
let end;
const onSelect = (cellInput) => {
  cellInput = cellInput.closest('.cell');
  cellInput.addEventListener('mousedown', (e) => {
    e.preventDefault();
    start = cellInput;
    end = cellInput;
  });
  cellInput.addEventListener('mouseup', () => {
    console.log('start: ', start, 'end: ', end);
  });
  cellInput.addEventListener('mouseover', (e) => {
    if (end) end = cellInput;
  });
};

const onMouseIn = (cellInput) => {};

export default {
  onCellBlurred,
  onCellFocus,
  onCellKeyDown,
  onGlobalInputBlurred,
  onGlobalInputKeydown,
  onSelect,
  onMouseIn,
};
