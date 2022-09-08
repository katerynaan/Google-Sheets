import { refreshCalculations } from './input-actions';

export function setCellDataIntoStorage({ cellId, data }) {
  console.log('settting into storage: ', cellId, data);
  const cell_data = JSON.parse(localStorage.getItem('cell_data')) || {
    formulas: {},
    numbers: {},
  };
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
  localStorage.setItem('cell_data', JSON.stringify(cell_data));
}

export function renderExistingStorageData() {
  const cell_data = JSON.parse(localStorage.getItem('cell_data')) || {
    formulas: {},
    numbers: {},
  };
  for (let type in cell_data) {
    for (let cell in cell_data[type]) {
      const inputElement = document.getElementsByClassName('input_' + cell)[0];
      inputElement.value = cell_data[type][cell];
    }
  }
  return refreshCalculations();
}
