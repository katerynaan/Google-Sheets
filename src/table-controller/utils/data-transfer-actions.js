import store from '../../utils/store';
import { navigate } from './navigation-actions';

export function copy() {
  const selected = store.currentSelected();
  let initialRow = +selected[0].classList[1].substring(1);
  const data = [];
  for (let i = 0; i < selected.length; i++) {
    const itemRow = +selected[i].classList[1].substring(1);
    if (itemRow > initialRow) {
      data.push('|');
      initialRow = itemRow;
    }
    const value = selected[i].getElementsByTagName('input')[0].value;
    data.push(value);
  }
  return sessionStorage.setItem('copied', JSON.stringify(data));
}

export function paste(startCell) {
  let initialCell = startCell;
  const data = JSON.parse(sessionStorage.getItem('copied'));
  while (data.length > 0) {
    startCell.value = data[0];
    startCell.focus();
    data.shift();
    if (data[0] === '|') {
      // \ is a delimitor between the rows. Each new row begins after | like A1 B1 C1 | A2 B2 C2
      startCell = navigate(initialCell, 'ArrowDown')[0];
      initialCell = startCell;
      data.shift();
    } else {
      startCell = navigate(startCell, 'ArrowRight')[0];
    }
  }
  startCell.focus();
  store.removeSelections();
}

export function deleteAllSelectedValues() {
  const selected = document.querySelectorAll('.cell_selected');
  for (let i = 0; i < selected.length; i++) {
    const input = selected[i].getElementsByTagName('input')[0];
    input.value = '';
    input.focus();
  }
}
