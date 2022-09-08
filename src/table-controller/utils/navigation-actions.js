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