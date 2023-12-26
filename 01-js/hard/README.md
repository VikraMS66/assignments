# Eval funciton code

---

function calculateExpression(expression) {
// Shunting Yard Algorithm for parsing
function shuntingYard(tokens) {
let outputQueue = [];
let operatorStack = [];

          const precedence = {
              '+': 1,
              '-': 1,
              '*': 2,
              '/': 2,
          };

          tokens.forEach(token => {
              if (!isNaN(token)) {
                  outputQueue.push(parseFloat(token));
              } else if (token in precedence) {
                  while (
                      operatorStack.length > 0 &&
                      precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]
                  ) {
                      outputQueue.push(operatorStack.pop());
                  }
                  operatorStack.push(token);
              } else if (token === '(') {
                  operatorStack.push(token);
              } else if (token === ')') {
                  while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                      outputQueue.push(operatorStack.pop());
                  }
                  operatorStack.pop(); // Discard the '('
              }
          });

          while (operatorStack.length > 0) {
              outputQueue.push(operatorStack.pop());
          }

          return outputQueue;
      }

      // Evaluate Reverse Polish Notation (RPN)
      function evaluateRPN(rpn) {
          let stack = [];

          rpn.forEach(token => {
              if (!isNaN(token)) {
                  stack.push(token);
              } else {
                  let operand2 = stack.pop();
                  let operand1 = stack.pop();

                  switch (token) {
                      case '+':
                          stack.push(operand1 + operand2);
                          break;
                      case '-':
                          stack.push(operand1 - operand2);
                          break;
                      case '*':
                          stack.push(operand1 * operand2);
                          break;
                      case '/':
                          stack.push(operand1 / operand2);
                          break;
                  }
              }
          });

          return stack.pop();
      }

      // Tokenize the input expression
      const tokens = expression
          .replace(/\s+/g, '') // Remove whitespace
          .match(/(\d+|\+|\-|\*|\/|\(|\))/g); // Match numbers, operators, and parentheses

      if (!tokens) {
          console.error('Invalid expression');
          return null;
      }

      // Convert infix expression to Reverse Polish Notation (RPN)
      const rpn = shuntingYard(tokens);

      // Evaluate the RPN expression
      const result = evaluateRPN(rpn);

      if (isNaN(result)) {
          console.error('Error in expression');
          return null;
      }

      return result;

}

// Example usage:
const expression = "10 + 2 \* (6 - (4 + 1) / 2) + 7";
const result = calculateExpression(expression);

if (result !== null) {
console.log('Result:', result);
} else {
console.log('Unable to calculate the expression.');
}

---
