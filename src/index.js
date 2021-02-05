function eval() {
  // Do not use eval!!!
  return;
}

const operation = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

function calculate(expr) {
  let expression = expr.split(' ');

  function calc(o1, o2) {
    for (let i = 1; i < expression.length - 1; i++) {
      if (expression[i] === o1 || expression[i] === o2) {
        expression[i] = operation[expression[i]](+expression[i - 1], +expression[i + 1]);
        expression.splice(i - 1, 3, expression[i]);
        i--;
      }
    }
  }

  calc('*', '/');
  calc('+', '-');

  return +expression[0];
}

const countChars = (string, symbol) => string.replace(RegExp(`[^${symbol}]`, 'g'), '').length;

function checkForErrors(expr) {
  const checker = expr
    .split(' ')
    .filter((symbol) => symbol.length > 0)
    .join('');

  // numbers of "(" and ")" are equal
  if (countChars(checker, '(') !== countChars(checker, ')')) {
    throw new Error('ExpressionError: Brackets must be paired');
  }

  // if divide by zero
  if (checker.includes('/0')) {
    throw new Error('TypeError: Division by zero.');
  }
}

function expressionCalculator(expr) {
  checkForErrors(expr);

  expr = expr.replace(/\s/g, '').replace(/([*/+-])/g, ' $& ');

  if (expr.match(/\(/g)) {
    for (let i = expr.match(/\(/g).length; i !== 0; i--) {
      const calculation = expr.match(/(\([0-9+/*-. ]+\))/g)[0];
      const expression = calculation.slice(1, calculation.length - 1);
      expr = expr.replace(calculation, calculate(expression));
    }
  }

  return calculate(expr);
}

module.exports = {
  expressionCalculator,
};
