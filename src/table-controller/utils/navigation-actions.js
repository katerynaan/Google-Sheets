import { createElement } from '../../utils/element_utils';
import { renderCells } from './cells-renderer';

export function navigateCells(targetCell, key) {
  const elements = navigate(targetCell, key);
  if (elements.length > 0) {
    elements[0].focus();
    return elements[0];
  }
}

export function navigate(targetCell, key) {
  const cellID = targetCell.classList[1].replace('input_', '');
  let newCellId;
  const keyList = {
    ArrowDown: () => {
      newCellId = cellID[0] + (+cellID.slice(1) + 1);
    },
    ArrowUp: () => {
      newCellId = cellID[0] + (+cellID.slice(1) - 1);
    },
    ArrowRight: () => {
      newCellId =
        String.fromCharCode(cellID.charCodeAt(0) + 1) + cellID.slice(1);
    },
    ArrowLeft: () => {
      newCellId =
        String.fromCharCode(cellID.charCodeAt(0) - 1) + cellID.slice(1);
    },
  };
  keyList[key]();
  return document.getElementsByClassName('input_' + newCellId);
}

export function navigateToNextCell(target) {
  navigateCells(target, 'ArrowDown').focus();
}

export async function removeSelectedCell(newCellInput) {
  const selected = document.querySelectorAll('.cell_selected');
  for (let i = 0; i < selected.length; i++) {
    await selected[i].classList.remove('cell_selected');
  }
  newCellInput.closest('.cell').classList.add('cell_selected');
}

export function virtualize(table, rows) {
  const lastChild = rows.children[rows.children.length - 1];
  if (
    lastChild.getBoundingClientRect().bottom -
      table.getBoundingClientRect().bottom <=
    15
  ) {
    const newRow = createElement('div', `row-cell ${rows.children.length + 1}`);
    renderCells(newRow, {
      value: rows.children.length + 1,
    });
    rows.append(newRow);
  } else if (
    lastChild.getBoundingClientRect().bottom >
    table.getBoundingClientRect().bottom + 50
  ) {
    lastChild.remove();
  }
}
