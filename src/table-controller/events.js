import {
  copy,
  deleteAllSelectedValues,
  paste,
} from './utils/data-transfer-actions';
import {
  syncInputs,
  calculate,
  removeLastCharOperand,
  setAsFormula,
  displayFormula,
} from './utils/input-actions';
import {
  navigateCells,
  removeSelectedCell,
  virtualize,
} from './utils/navigation-actions';
import { setCellDataIntoStorage } from './utils/storage';
import store from '../utils/store';
import { createElement } from 'react';
import { renderCells } from './utils/cells-renderer';

let selectedCell;
let shiftKeyOn = false;

const onTableScrolled = (table, rows) => {
  table.addEventListener('scroll', () => {
    virtualize(table, rows);
  });
};

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
      shiftKeyOn = false;
    }
  });

function handleHotKeys(e) {
  const { key, keyCode, target, ctrlKey, shiftKey } = e;
  let hotKeys = false;
  if (keyCode >= 37 && keyCode <= 40) {
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      virtualize(
        document.getElementsByClassName('table-wrapper')[0],
        document.getElementsByClassName('table_rows')[0]
      );
    }
    const newCell = navigateCells(target, key);
    if (shiftKey) {
      shiftKeyOn = true;
      store.selectRange(newCell.closest('.cell'));
    }
    hotKeys = true;
  } else if (ctrlKey && key == 'c') {
    e.preventDefault();
    copy();
    hotKeys = true;
  } else if (ctrlKey && key == 'v') {
    e.preventDefault();
    paste(target);
    hotKeys = true;
  } else if (keyCode === 46) {
    deleteAllSelectedValues();
    hotKeys = true;
  }
  return hotKeys;
}

const onGlobalInputKeydown = (globalInput) =>
  globalInput.addEventListener('keydown', ({ key, keyCode, target }) => {
    setAsFormula(target, selectedCell, key);
    syncInputs(globalInput, selectedCell, key, keyCode, true);
  });

const onCellFocus = (cellInput, globalInput) =>
  cellInput.addEventListener('focus', ({ target }) => {
    globalInput.value = target.value;
    displayFormula(target, globalInput);
    if (!shiftKeyOn) removeSelectedCell(cellInput);
    selectedCell = target;
  });

let startCellSelected;
let endCellSelected;
const onSelect = (cellInput, cell) => {
  cell.addEventListener('mousedown', (e) => {
    e.preventDefault();
    removeSelectedCell(cellInput);
    store.pushInitialSelection(cell);
    startCellSelected = cell;
  });
  cell.addEventListener('mouseup', () => {
    endCellSelected = cell;
    if (startCellSelected.classList[1] === endCellSelected.classList[1]) {
      removeSelectedCell(cellInput);
      cellInput.focus();
      selectedCell = cellInput;
      store.pushInitialSelection(cellInput.closest('.cell'));
    }
    startCellSelected = null;
    endCellSelected = null;
  });
  cell.addEventListener('mouseover', () => {
    if (startCellSelected) {
      if (endCellSelected !== cell && endCellSelected) store.selectRange(cell);
      endCellSelected = cell;
    }
  });
  cell.addEventListener('mouseout', () => {
    if (startCellSelected) {
      if (!endCellSelected) cell.classList.remove('cell_selected');
      else trackSelectionDirection(cell);
    }
  });
};

function getCharIndex(cell) {
  return cell.classList[1].charCodeAt(0);
}

function trackSelectionDirection(cell) {
  if (getCharIndex(cell) < getCharIndex(endCellSelected)) {
    cell.classList.remove('cell_selected');
  }
}

export default {
  onTableScrolled,
  onCellBlurred,
  onCellFocus,
  onCellKeyDown,
  onGlobalInputBlurred,
  onGlobalInputKeydown,
  onSelect,
};
