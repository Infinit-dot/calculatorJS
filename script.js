const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === "number") {
    if (displayValue === "0" || previousKeyType === "operator") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  if (type === "operator" || type === "decimal" ) {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"] [data-type="decimal"]');
    operatorKeys.forEach((el) => {
      el.dataset.state = "";
    });
    key.dataset.state = "selected";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === "equal") {
    // Perform a calculation
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    const total = calculate(firstNumber, operator, secondNumber)
      display.textContent = total;

  }
  if (type === "decimal") {
    if (!displayValue.includes('.')) {
        display.textContent = displayValue + '.'
      } else if (previousKeyType === 'operator') {
        display.textContent = '0.'
      }
  }

  if (type === "clear") {
    display.textContent = "0";
    delete calculator.dataset.firstNumber;
    delete calculator.dataset.operator;
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);

  if (operator === "plus") return firstNumber + secondNumber;
  if (operator === "minus") return firstNumber - secondNumber;
  if (operator === "times") return firstNumber * secondNumber;
  if (operator === "divide") return firstNumber / secondNumber;
}
