const operators = ['+', '-', '/', '*'];
const priorityOperators = ['*', '/'];
const calc = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

export function toArray(string) {
  const array = [];
  for (let i = 0; i < string.length; i++) {
    placeCharInArray(string, i, array);
  }
  return array;
}

function placeCharInArray(string, i, array) {
  const char = string[i];
  if (operators.includes(char) && i === 0) {
    array.unshift('0');
  }
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
  if (!isNaN(item)) {
    return item;
  } else {
    const element = document.getElementsByClassName(`input_${item}`)[0];
    if (element) {
      return !element.value ? 'NaN' : element.value;
    } else return item;
  }
}

export function reduceSortedArray(
  array = ['12', '+', '8', '/', '2', '-', '6', '*', '2'],
  i = 1,
  passedPriorityOperators
) {
  if (array.length <= 1) return array[0];
  if (i >= array.length && !passedPriorityOperators)
    return reduceSortedArray(array, 1, true);
  if (!passedPriorityOperators) {
    if (priorityOperators.includes(array[i])) {
      const left = +array[i - 1];
      array[i - 1] = calc[array[i]](left, +array[i + 1]);
      array.splice(i, 2);
    }
    return reduceSortedArray(array, i + 2);
  } else {
    const left = +array[0];
    const right = +array[2];
    const op = array[1];
    array = array.slice(2);
    array[0] = calc[op](left, right);
    return reduceSortedArray(array, 1, true);
  }
}