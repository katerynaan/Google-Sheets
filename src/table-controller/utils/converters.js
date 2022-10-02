import globalReducer from './redux/global-reducer';
import { updateReferenceValue } from './redux/slices/referencesSlice';

const calcs = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

export function toArray(infix, input) {
  var output = [];
  var stack = [];
  for (var i = 0; i < infix.length; i++) {
    var ch = infix.charAt(i);
    if (ch in calcs) {
      while (
        stack.length != 0 &&
        stack[stack.length - 1] != '(' &&
        getPrecedence(ch) <= getPrecedence(stack[stack.length - 1])
      ) {
        output.push(stack.pop());
      }
      stack.push(ch);
    } else if (ch == '(') {
      stack.push(ch);
    } else if (ch == ')') {
      while (stack.length != 0 && stack[stack.length - 1] != '(') {
        output.push(stack.pop());
      }
      stack.pop();
    } else {
      if (!(infix[i - 1] in calcs) && i !== 0) {
        output[output.length - 1] += ch;
        if (infix[i + 1] in calcs && isNaN(output[output.length - 1])) {
          handleReferences(output);
        }
      } else output.push(ch);
    }
  }
  while (stack.length != 0) {
    output.push(stack.pop());
  }
  return output;
}
function getPrecedence(ch) {
  if (ch == '+' || ch == '-') {
    return 1;
  } else if (ch == '*' || ch == '/') {
    return 2;
  } else {
    return 0;
  }
}

function handleReferences(output, input) {
  const element = document.getElementsByClassName(
    'input_' + output[output.length - 1]
  )[0];
  if (element) {
    output[output.length - 1] = element.value;
    addReference(element, input);
  }
}

function addReference(element, input) {
  if (input) {
    const currentReeferencers = globalReducer.getState().references.value[item];
    if (!currentReeferencers) {
      globalReducer.dispatch(
        updateReferenceValue({
          value: {
            id: item,
            data: input.classList[1].replace('input_', ''),
          },
        })
      );
    } else {
      if (currentReeferencers.includes(item)) {
        return { error: 'Recursive reference!' };
      }
    }
    return !element.value ? 'NaN' : element.value;
  }
}

export function reduceSortedArray(postfix) {
  const res = [];
  const stack = [];
  for (let i = 0; i < postfix.length; i++) {
    const item = postfix[i];
    if (item in calcs) {
      stack.push(item);
    } else {
      res.push(item);
    }
  }
  while (stack.length) {
    const right = +res.pop();
    const left = +res.pop();
    res.push(calcs[stack.shift()](left, right));
  }
  return res[0];
}
