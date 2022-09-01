const amountOfColumns = Math.ceil(window.innerWidth / 100);
const amountOfRows = Math.ceil(window.innerHeight / 30);

const fakeColumns = new Array(amountOfColumns).fill(0).map((item, i) => ({
  value: i == 0 ? '' : String.fromCharCode(64 + i),
}));
const fakeRows = new Array(amountOfRows).fill(0, 1).map((item, i) => ({
  value: i + '',
}));

export default { fakeColumns, fakeRows };
