const cellHeight = 30;
const amountOfColumns = 27; //A-Z
const amountOfRows = Math.ceil((window.innerHeight - 50) / cellHeight);

const fakeColumns = new Array(amountOfColumns).fill(0).map((item, i) => ({
  value: i == 0 ? '' : String.fromCharCode(64 + i),
}));
const fakeRows = new Array(amountOfRows + 3).fill(0, 1).map((item, i) => ({
  value: i + '',
}));

export default { fakeColumns, fakeRows };
