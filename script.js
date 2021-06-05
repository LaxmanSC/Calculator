class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.single_operand = false
      this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
      this.single_operand = false 
      if (operation === '10^x' || operation === 'log x' || operation === 'ln x' || operation === '+/-' ) {
        this.single_operand = true
      }
      if(this.currentOperand ==='' ) return 

      if(this.previousOperand !== '' && !(this.single_operand)) {
        this.double_compute()
      }
      else if (this.previousOperand !== '' && !(this.single_operand)) {
        this.single_compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }

    double_compute() {
      let computation
      const current = parseFloat(this.currentOperand)
      const prev = parseFloat(this.previousOperand)
      if(isNaN(prev) || isNaN(current)) return
      switch(this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        case 'y√x':
          computation = Math.pow(prev, 1/(current))
          break
        case 'x^y':
          computation = Math.pow(prev, current)
          break
        default:
          return
      }
      this.currentOperand = computation 
      this.operation = undefined
      this.previousOperand = ``
   }

   single_compute() 
   {
     let result
     const previous = parseFloat(this.previousOperand)
     if(isNaN(previous)) return 
     switch(this.operation) {
      case '10^x':
        console.log(previous)
        result = Math.pow(10, previous)
        console.log(result)  
        break
      case 'log x':
        result = Math.log10(previous)
        break
      case 'ln x':
        result = Math.log(previous)
        break
      case '+/-':
        result = 0 - previous
        break
      default:
        return
     }
     this.currentOperand = result
     this.operation = undefined
     this.previousOperand = ''
   }


    updateDisplay() {
     this.currentOperandTextElement.innerText = this.currentOperand
     if(this.operation != null) {
       this.previousOperandTextElement.innerText = `${(this.previousOperand)} ${this.operation}`
     }
     else {
       this.previousOperandTextElement.innerText = ''
     }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const doubleOperationButtons = document.querySelectorAll('[data-operation]')
const singleOperationButtons = document.querySelectorAll('[data-single-operation]')
const constantButtons = document.querySelectorAll('[data-constants]')
const bracketButtons = document.querySelectorAll('[data-brackets]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

let operandSingle = false

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  }) 
})

doubleOperationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    operandSingle = false
    console.log(operandSingle)
  })
})


singleOperationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    operandSingle = true 
    console.log(operandSingle)
  })
})

equalsButton.addEventListener('click', () => {
  if(operandSingle){
    calculator.single_compute()
  }
  else {
    calculator.double_compute()
  }
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})
