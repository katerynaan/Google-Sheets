import { getCellsData, setCellsData } from '../../utils/table_data_proto';
import { refreshCalculations } from './input-actions';
import globalReducer from './redux/global-reducer';
import { setValues, setCellValue } from './redux/slices/cellValuesSlice';

export async function setCellDataIntoStorage({ cellId, data }) {
  globalReducer.dispatch(setCellValue({ value: { cellId, data } }));
  const cell_data = globalReducer.getState().cellData.value;
  const toUpdate = {
    _id: globalReducer.getState().auth.value.userName,
    ...cell_data,
  };
  const returnData = await setCellsData(toUpdate);
  return returnData;
}

export async function renderExistingStorageData() {
  const cell_data = await await getCellsData();
  globalReducer.dispatch(setValues({ value: cell_data }));
  return refreshCalculations();
}

export async function removeCellFromStorage(cell) {
  const cell_data = await getCellsData();
  const cellId = cell.classList[1].replace('input_', '');
  delete cell_data.formulas[cellId];
  delete cell_data.numbers[cellId];
}
