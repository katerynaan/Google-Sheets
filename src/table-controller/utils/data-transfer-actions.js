import { navigate } from './navigation-actions';

export function copy(data) {
  return navigator.clipboard.writeText(JSON.stringify(data));
}

export async function paste(startCell) {
  let initialCell = startCell;
  const data = JSON.parse(await navigator.clipboard.readText()); //[value, '|', '125', '45', '|', '234'];
  while (data.length > 0) {
    startCell.value = data[0];
    startCell.focus();
    data.shift();
    if (data[0] === '|') {
      startCell = navigate(initialCell, 'ArrowDown')[0];
      initialCell = startCell;
      data.shift();
    } else {
      startCell = navigate(startCell, 'ArrowRight')[0];
    }
  }
  startCell.focus();
}
