const cellHeight = 30;
const amountOfColumns = 27; //A-Z
const amountOfRows = Math.ceil((window.innerHeight - 50) / cellHeight);

const fakeColumns = new Array(amountOfColumns).fill(0).map((item, i) => ({
  value: i == 0 ? '' : String.fromCharCode(64 + i),
}));
const fakeRows = new Array(amountOfRows + 3).fill(0, 1).map((item, i) => ({
  value: i + '',
}));

export const getCellsData = () => {
  return (
    JSON.parse(localStorage.getItem('cell_data')) || {
      formulas: {},
      numbers: {},
    }
  );
};

export const setCellsData = (cell_data) => {
  localStorage.setItem('cell_data', JSON.stringify(cell_data));
};

export default { fakeColumns, fakeRows };
