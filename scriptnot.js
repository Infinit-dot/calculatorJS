class Calculator {
    constructor(prev, current) {
      this.prev = prev
      this.current = current
      this.clear()
  }
  // clear all data 
clear() {
  this.current = ''
  this.prev = ''
  this.operation = undefined
}
delete() {
  this.current = this.current.toString().slice(0, -1)
}
appendNumber(number) {
  if (number === '.' && this.current.includes('.')) return
  this.current = this.current.toString() + number.toString()
}
chooseOperation(operation) {
  if (this.current === '') return
  if (this.prev !== '') {
    this.compute()
  }
  this.operation = operation
  this.prev = this.current
  this.current = ''
}
calculate() {
  let result
  const prev = parseFloat(this.prev)
  const current = parseFloat(this.current)
  if (isNaN(prev) || isNaN(current)) return
  switch (this.operation) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '÷':
      result = prev / current
      break
    default:
      return
  }
this.current = result
this.operation = undefined
this.prev = ''
}
getDisplayNumber(number) {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}
}

const numBtn= document.querySelectorAll('[number]');
const operationBtn = document.querySelectorAll('[operation]');
const equalsBtn = document.querySelector('[equals]');
const clearBtn = document.querySelector('[clearBtn]');
const deleteBtn = document.querySelector('[delete]');
const prevTxt = document.querySelector('[prev]');
const currentTxt = document.querySelector('[current]');

const calculator = new Calculator(prevTxt, currentTxt)
console.log(equalsBtn)
numBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsBtn.addEventListener('click', button => {
  calculator.calculate()
  calculator.updateDisplay()
})

clearBtn.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
