import { getCellsData, setCellsData } from '../../utils/table_data_proto';
import { refreshCalculations } from './input-actions';
import globalReducer from './redux/global-reducer';
import { setNumbers, setFormulas } from './redux/slices/cellValuesSlice';

export function setCellDataIntoStorage({ cellId, data }) {
  const cell_data = getCellsData();
  if (data[0] === '=') {
    cell_data.formulas[cellId] = data;
    delete cell_data['numbers'][cellId];
  } else {
    if (data) {
      cell_data['numbers'][cellId] = data;
    } else {
      delete cell_data['numbers'][cellId];
    }
    delete cell_data['formulas'][cellId];
  }
  setCellsData(cell_data);
  globalReducer.dispatch(setNumbers({ value: cell_data['numbers'] }));
  globalReducer.dispatch(setFormulas({ value: cell_data['formulas'] }));
}

export function renderExistingStorageData() {
  const cell_data = getCellsData();
  globalReducer.dispatch(setNumbers({ value: cell_data.numbers }));
  globalReducer.dispatch(setFormulas({ value: cell_data.formulas }));
  return refreshCalculations();
}

export function removeCellFromStorage(cell) {
  const cell_data = JSON.parse(localStorage.getItem('cell_data')) || {
    formulas: {},
    numbers: {},
  };
  const cellId = cell.classList[1].replace('input_', '');
  delete cell_data.formulas[cellId];
  delete cell_data.numbers[cellId];
  sessionStorage.setItem('cell_data', JSON.stringify(cell_data));
}
