class Store {
  constructor() {
    this.selected = [];
  }
  pushInitialSelection(cell) {
    this.selected.push(cell);
    cell.classList.add('cell_selected');
  }
  selectRange(endCell) {
    const selectedClassName = 'cell_selected';
    const startRow = +this.selected[0].classList[1].substring(1);
    const selectedRow =
      +this.selected[this.selected.length - 1].classList[1].substring(1);
    const endRow = +endCell.classList[1].substring(1);
    const startCol = this.selected[0].classList[1].charCodeAt(0);
    const selectedCol =
      this.selected[this.selected.length - 1].classList[1].charCodeAt(0);
    const endCol = endCell.classList[1].charCodeAt(0);
    if (endCol > selectedCol) {
      this.addRange(endCol, endCol, selectedRow, endRow, selectedClassName);
    } else if (endCol < selectedCol) {
      this.removeRange(endCol, selectedCol, endRow, endRow, selectedClassName);
    } else if (endRow > selectedRow) {
      this.addRange(startCol, endCol, startRow, endRow, selectedClassName);
    } else {
      this.removeRange(
        startCol,
        selectedCol,
        endRow,
        selectedRow,
        selectedClassName
      );
    }
  }
  removeRange(colStart, colEnd, rowStart, rowEnd, selectedClassName) {
    console.log('range to remove: ', colStart, colEnd, rowStart, rowEnd);
    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        const element = document.getElementsByClassName(
          String.fromCharCode(j) + i
        )[0];
        this.selected = this.selected.filter(
          (item) => item.classList[1] !== element.classList[1]
        );
        element.classList.remove(selectedClassName);
      }
    }
  }
  addRange(colStart, colEnd, rowStart, rowEnd, selectedClassName) {
    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        const element = document.getElementsByClassName(
          String.fromCharCode(j) + i
        )[0];
        element.classList.add(selectedClassName);
        this.selected.push(element);
      }
    }
  }
  clearSelected() {
    this.selected = [];
  }
  removeSelections() {
    for (let i = 0; i < this.selected.length; i++) {
      this.selected[i].classList.remove('cell_selected');
    }
    this.clearSelected();
  }
  currentSelected() {
    return this.selected;
  }
}

export default new Store();
