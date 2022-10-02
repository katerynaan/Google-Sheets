import globalReducer from '../table-controller/utils/redux/global-reducer';

const cellHeight = 30;
const amountOfColumns = 27; //A-Z
const amountOfRows = Math.ceil((window.innerHeight - 50) / cellHeight);

const fakeColumns = new Array(amountOfColumns).fill(0).map((item, i) => ({
  value: i == 0 ? '' : String.fromCharCode(64 + i),
}));
const fakeRows = new Array(amountOfRows + 3).fill(0, 1).map((item, i) => ({
  value: i + '',
}));

export const getCellsData = async () => {
  const json = await fetch('http://localhost:4000/getCells', {
    method: 'POST',
    body: JSON.stringify({ id: globalReducer.getState().auth.value.userName }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await json.json();
  return data;
};

export const setCellsData = async (cell_data) => {
  try {
    const json = await fetch('http://localhost:4000/setCells', {
      method: 'POST',
      body: JSON.stringify(cell_data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await json.json();
  } catch (err) {
    throw err;
  }
};

export default { fakeColumns, fakeRows };
