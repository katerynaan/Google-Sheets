const operators = ['+', '-', '/', '*'];

export function toArray(string) {
  const array = [];
  for (let i = 0; i < string.length; i++) {
    placeCharInArray(string, i, array);
  }
  return array;
}

function placeCharInArray(string, i, array) {
  const char = string[i];
  if (operators.includes(char)) {
    array[array.length - 1] = checkIfNum(array[array.length - 1]);
    array.push(char);
  } else if (i === string.length - 1 && !operators.includes(string[i - 1])) {
    array[array.length - 1] = array[array.length - 1] + char;
    array[array.length - 1] = checkIfNum(array[array.length - 1]);
  } else if (
    !operators.includes(char) &&
    !operators.includes(string[i - 1]) &&
    array.length > 0
  ) {
    array[array.length - 1] = array[array.length - 1] + char;
  } else {
    array.push(char);
  }
}

function checkIfNum(item) {
  console.log('item: ', item);
  if (!isNaN(item)) {
    return item;
  } else {
    const element = document.getElementsByClassName(`input_${item}`)[0];
    if (element) return element.value;
    else return item;
  }
}
