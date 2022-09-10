export function selectCellBasedOnRange(startCell, endCell) {
  const selectedClassName = 'cell_selected';
  const startRow = +startCell.classList[1].substring(1);
  const endRow = +endCell.classList[1].substring(1);
  const startCol = startCell.classList[1].charCodeAt(0);
  const endCol = endCell.classList[1].charCodeAt(0);
  for (let j = startCol; j <= endCol; j++) {
    for (let i = startRow; i <= endRow; i++) {
      document
        .getElementsByClassName(String.fromCharCode(j) + i)[0]
        .classList.add(selectedClassName);
    }
  }
}
