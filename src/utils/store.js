class Selected {
  constructor() {
    //this.selected = [];
    this.selected = {}; //{"65": [cellA1, cellA2], "66": [cellB1, cellB2]};
    this.startInfo = {};
    this.lastInfo = {};
    this.selectedName = 'cell_selected';
  }
  tags = {
    pushRow: (element, j, i) =>
      this.selected[j]
        ? this.selected[j].push(element)
        : (this.selected[j] = [element]),
    deleteRow: (element, j, i) => this.selected[j].shift(),
    pushCol: (element, j, i) =>
      this.selected[j]
        ? this.selected[j].push(element)
        : (this.selected[j] = [element]),
    deleteCol: (element, j, i) =>
      this.selected[j].length > 0
        ? this.selected[j].pop()
        : delete this.selected[j],
  };
  pushInitialSelection(cell) {
    const { cellCol, cellRow } = this.destructureCell(cell);
    this.startInfo = { cellCol, cellRow };
    this.lastInfo = { cellCol, cellRow };
    this.selected = {};
    this.selected[cellCol + ''] = [cell];
  }
  selectRange(endCell) {
    const endCellInfo = this.destructureCell(endCell);
    if (endCellInfo.cellCol > this.lastInfo.cellCol) {
      this.addColRemainRow(endCellInfo);
    } else if (endCellInfo.cellRow > this.lastInfo.cellRow) {
      this.addRowRemainCol(endCellInfo);
    } else if (endCellInfo.cellCol < this.lastInfo.cellCol) {
      this.deleteColRemainRow(endCellInfo);
    } else if (endCellInfo.cellRow < this.lastInfo.cellRow) {
      this.deleteRowRemainCol(endCellInfo);
    }
    this.lastInfo = endCellInfo;
  }
  addRowRemainCol(endCellInfo) {
    this.addRange(
      this.startInfo.cellCol,
      endCellInfo.cellCol,
      this.lastInfo.cellRow,
      endCellInfo.cellRow,
      'pushRow'
    );
  }
  addColRemainRow(endCellInfo) {
    this.addRange(
      this.lastInfo.cellCol,
      endCellInfo.cellCol,
      this.startInfo.cellRow,
      endCellInfo.cellRow,
      'pushCol'
    );
  }
  deleteColRemainRow(endCellInfo) {
    this.removeRange(
      this.lastInfo.cellCol,
      this.lastInfo.cellCol,
      this.startInfo.cellRow,
      endCellInfo.cellRow,
      'deleteCol'
    );
  }
  deleteRowRemainCol(endCellInfo) {
    this.removeRange(
      this.startInfo.cellCol,
      this.lastInfo.cellCol,
      this.lastInfo.cellRow,
      this.lastInfo.cellRow,
      'deleteRow'
    );
  }
  destructureCell(cell) {
    const cellRow = +cell.classList[1].substring(1); //12
    const cellCol = cell.classList[1].charCodeAt(0); //64(A)
    return { cellRow, cellCol };
  }
  addRange(startCol, endCol, startRow, endRow, tag) {
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        const element = document.getElementsByClassName(
          String.fromCharCode(j) + i
        )[0];
        if (
          !this.selected[j] ||
          !this.selected[j].find((item) => item === element)
        )
          this.tags[tag](element, j + '', i);
        element.classList.add(this.selectedName);
      }
    }
  }
  removeRange(startCol, endCol, startRow, endRow, tag) {
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        const element = document.getElementsByClassName(
          String.fromCharCode(j) + i
        )[0];
        this.tags[tag](element, j + '', i);
        element.classList.remove(this.selectedName);
      }
    }
  }
  getSelected() {
    return this.selected;
  }
  removeSelections() {
    for (let col in this.selected) {
      for (let i = 0; i < this.selected[col].length; i++) {
        const cell = this.selected[col][i];
        cell.classList.remove(this.selectedName);
      }
    }
    this.selected = {};
  }
}

export default new Selected();
