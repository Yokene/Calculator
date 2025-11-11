let count = 0

const valueDisplay = document.querySelector('.screen')
const backspaceBtn = document.querySelector('.backspace-btn')
const calcButton = document.querySelectorAll('.calc-button')
const funcBtn = document.querySelectorAll('.func-btn')
const reset = document.querySelector('.reset')
const equal = document.querySelector('.equal')
const zero = document.querySelector('.zero')

console.log(count, valueDisplay, calcButton, funcBtn, equal, zero)

let currentNumber = ""
let previousNumber = ""
let operator = null


function updateDisplay(value) {
    if (value === "" || value === null) {
        valueDisplay.textContent = "0"
        return
    }

    let str = String(value)

    str = str.replace(/\s/g, "");

    if (str.length > 12) {
        str = str.slice(0, 12)
    }

    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    valueDisplay.textContent = str
}

calcButton.forEach(button => {
    button.addEventListener('click', event => {
        const value = event.target.textContent
        

        if (!isNaN(value)) {

            const cleanNumber = currentNumber.replace(/\s/g, "")

            if (currentNumber.replace(/\s/g, "").length < 12){
            currentNumber += value
            }
            updateDisplay(currentNumber)
        }

        if (["+", "−", "×", "÷"].includes(value)) {
            previousNumber = currentNumber
            operator = value
            currentNumber = ""
        }

        if(operator) {
            updateDisplay(`${previousNumber} ${operator} ${currentNumber}`)
        } else{
            updateDisplay(currentNumber)
        }

        
    })
})

equal.addEventListener('click', function(){
    if (operator === "+") {
        currentNumber = Number(previousNumber) + Number(currentNumber)
    }else if (operator === "−") {
        currentNumber = Number(previousNumber) - Number(currentNumber)
    }else if (operator === "×") {
        currentNumber = Number(previousNumber) * Number(currentNumber)
    }else if (operator === "/") {
        currentNumber = Number(previousNumber) / Number(currentNumber)
    }

    if (operator === "÷" && Number(currentNumber) === 0){
        updateDisplay("Ошибка!")
        currentNumber = ""
        previousNumber = ""
        operator = null
        return;

    }
    
    updateDisplay(currentNumber)
    previousNumber = currentNumber
    operator = null
})


backspaceBtn.addEventListener('click', function(){
    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1)
        updateDisplay(operator ? `${previousNumber} ${operator} ${currentNumber}` : currentNumber, !!operator)
    } 

    else if (operator) {
        operator = null
        updateDisplay(previousNumber)
    } 

    else if (previousNumber !== "") {
        previousNumber = previousNumber.slice(0, -1)
        updateDisplay(previousNumber)
    }
})

reset.addEventListener('click', function(){
    currentNumber = ""
    previousNumber = ""
    operator = null
    updateDisplay("0")
})

updateDisplay(count)