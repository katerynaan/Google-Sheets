import {
  setAsFormula,
  syncInputs,
  removeLastCharOperand,
  calculate,
} from '../table-controller/utils/input-actions';
import { setCellDataIntoStorage } from '../table-controller/utils/storage';
import store from '../utils/store';

const onGlobalInputBlurred = (globalInput) =>
  globalInput.addEventListener('blur', ({ target }) => {
    setCellDataIntoStorage({
      cellId: store.getSelectedCell().classList[1].replace('input_', ''),
      data: target.value,
    });
    removeLastCharOperand(target, store.getSelectedCell());
    if (target.value) calculate(target.value, target);
  });

const onGlobalInputKeydown = (globalInput) =>
  globalInput.addEventListener('keydown', ({ key, keyCode, target }) => {
    const selectedCell = store.getSelectedCell();
    setAsFormula(target, selectedCell, key);
    syncInputs(globalInput, selectedCell, key, keyCode, true);
  });

export default { onGlobalInputBlurred, onGlobalInputKeydown };
