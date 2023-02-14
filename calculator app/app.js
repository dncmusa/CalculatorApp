const display = document.querySelector('.calculator-input')
const keys = document.querySelector('.calculator-keys')

let displayValue = '0'
let firstValue = null
let operator = null
let waitingForSecondValue = false


// YAZDIRILAN SAYININ GÜNCELLENMESİ
updateDisplay()

function updateDisplay() {
    display.value = displayValue
}
// BUTON OLAYLARI
keys.addEventListener('click', function (event) {
    const element = event.target

    if (!element.matches('button')) return;

    if (element.classList.contains('operator')) {
        handleOperator(element.value)
        updateDisplay()
        return;
    }

    if (element.classList.contains('decimal')) {
        inputDecimal()
        updateDisplay()
        return;
    }

    if (element.classList.contains('clear')) {
        inputClear()
        updateDisplay()
        return;
    }
    
    if (element.classList.contains('backspace')) {
        backspace()
        updateDisplay()
        return;
    }

    inputNumber(element.value)
    updateDisplay()
})
// İŞLEM OPERATÖRÜNÜ SEÇME VE YAZDIRILAN SAYIYI 7 HANEYE KISITLAMA
function handleOperator(nextOperator) {
    const value = parseFloat(displayValue)

    if (operator && waitingForSecondValue) {
        operator = nextOperator
        return;
    }

    if (firstValue === null) {
        firstValue = value
    } else if (operator) {
        const result = calculate(firstValue, value, operator)

        displayValue = `${parseFloat(result.toFixed(7))}`
        firstValue = result
    }

    waitingForSecondValue = true
    operator = nextOperator
}
// SAYILARIN HESAPLANMASI
function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second
    } else if (operator === '-') {
        return first - second
    } else if (operator === '*') {
        return first * second
    } else if (operator === '/') {
        return first / second
    }

    return second;
}

// SAYILARIN YAZDIRILMASI
function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num
        waitingForSecondValue = false
    } else { displayValue = displayValue === '0' ? num : displayValue + num; }
}
// ONDALIK SAYI TUŞU
function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.'
    }
}
// TEMİZLEME TUŞU
function inputClear() {
    if (displayValue != null) {
        displayValue = '0'
    }
}
// SİL TUŞU
function backspace() {
    if (displayValue.length > 0) {
      displayValue = displayValue.slice(0, -1);
    }
  }

