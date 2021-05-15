/* Display */
const displayText = document.querySelector('#calculator-display-text');

/* Numbers */
const numbers = Array.from(document.querySelectorAll('.number'));

/* Functionality */
const btnClear = document.querySelector('#btn-clear');
const btnDel = document.querySelector('#btn-del');
const btnPct = document.querySelector('#btn-pct');

/* Operators */
const operators = Array.from(document.querySelectorAll("#btn-div, #btn-multi, #btn-sub, #btn-add"));
const btnEq = document.querySelector('#btn-eq');

/* Signs */
const btnComma = document.querySelector('#btn-comma');


let num1 = 0;
let num2 = 0;
let result = 0;
let operator = '';
let operatorEnabled = false;

// clear display
btnClear.addEventListener('click', () => {
    displayText.innerHTML = '0';
})

// delete Last Number
btnDel.addEventListener('click', () => {
    if (displayText.innerHTML.length == 1) {
        // replace with 0 if all numbers are deleted
        displayText.innerHTML = displayText.innerHTML.replace(/.$/, '0');
    } else {
        // replace last character with emtpy string (delete last character)
        displayText.innerHTML = displayText.innerHTML.replace(/.$/, '');
    }
})

// calculate Percentage
btnPct.addEventListener('click', () => {
    num1 = Number(displayText.innerHTML);
    operator = btnPct.dataset['operator'];
    equals();
})

// Division
function divide(a, b) {
    return a / b;
}
// Multiplication
function multi(a, b) {
    return a * b;
}
// Subtraction
function subtraction(a, b) {
    return a - b;
}
// Addition
function addition(a, b) {
    return a + b;
}

// Get Operator
operators.forEach(op =>  
    op.addEventListener('click', e => {
        // if oerator gets clicked again instead of equals operator
        if (num1) {
            equals();
        }

        // target current clicked button
        const clickedOp = e.target;
        const selectedOp = clickedOp.dataset['operator'];
        operator = selectedOp;
        operatorEnabled = true;
        num1 = Number(displayText.innerHTML);
    })
)

// Equals
function equals() {
    operatorEnabled = true;
    num2 = Number(displayText.innerHTML);

    switch (operator) {
        case '+':
            result = addition(num1,num2); 
            break;
        case '-':
            result = subtraction(num1,num2);
            break;
        case '*':
            result = multi(num1,num2);
            break;
        case '/':
            result = divide(num1,num2);
            break;
        case '%':
            result = num1 / 100;
            break;
    }

    displayText.innerHTML = result;
}

// call equals-function when (=)-Button gets clicked
btnEq.addEventListener('click', equals);

// display Number whenever it gets clicked
numbers.forEach(number =>
    number.addEventListener('click', e => {
        const clickedNumber = e.target;
        selectedNumber = clickedNumber.dataset['number'];
        
        // when typing new number or operator was selected, clear display
        if (displayText.innerHTML == 0 || operatorEnabled == true) {
            displayText.innerHTML = '';
        } /*else if (displayText.innerHTML.length > 11) {
            numbers.forEach(number =>
                // disable eventListener if too many numbers are displayed
                number.removeEventListener('click', e));
        }*/
        displayText.innerHTML += selectedNumber;
        operatorEnabled = false;
    })
);

// Comma sign
btnComma.addEventListener('click', () => {
    displayText.innerHTML += '.';
})