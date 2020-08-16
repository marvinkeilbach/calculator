let operandArray = [];
let operandString = "";
let operandIndex = 0;

let operatorArray = [];
let operatorIndex = 0;

let outputString = "";
let result;
let decimalCheck = false;

const keyCheckNumber = "0123456789";
const keyCheckOperator = "+-*/";

const display = document.querySelector("#displayContent");
const numberInput = document.querySelectorAll(".number");
const operatorInput = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector("#clear");
const decimal = document.querySelector('#decimal');

numberInput.forEach(target => target.addEventListener('click', (e) => addNumber(e.target.innerText)));
operatorInput.forEach(target => target.addEventListener('click', e => addOperator(e.target.title)));
equals.addEventListener('click', getResult);
clear.addEventListener('click', resetCalculator);
decimal.addEventListener('click', addDecimal);
document.addEventListener('keydown', e => {
    console.log(e);
    if (keyCheckNumber.includes(e.key)) {
        addNumber(e.key);
    } else if (keyCheckOperator.includes(e.key)) {
        addOperator(e.key);
    } else if (e.key === "Enter" || e.key === " ") {
        getResult();
    } else if (e.key === "." || e.key === ",") {
        addDecimal();
    } else if (e.key === "Backspace") {
        deleteLastInput();
    }
})


const math = {
    add: function(x, y) {
        return x + y;
    },
    subtract: function (x, y) {
        return x - y;
    },
    multiply: function (x, y) {
        return x * y;
    },
    divide: function (x, y) {
        return x / y;
    },
    round: function (x) {
        return (Math.round(x * 100000) / 100000); 
    },
    operate: function(x, y, op) {
        if (op === '+') {
            return this.add(x, y);
        } else if (op === '-') {
            return this.subtract(x, y);
        } else if (op === '*') {
            return this.multiply(x, y);
        } else if (op === '/') {
            if (y === 0) {
                return 'notAllowed';
            }
            return this.divide(x, y);
        } else {
            return false;
        }
    }
}

function addNumber(e) {
    if (result === null) {
        resetCalculator();
        result = 0;
    }

    operandString += e;
    outputString += e;
    updateDisplay();
}

function addDecimal() {
    if (operandString.length === 0) {
        return false;
    } else if (decimalCheck === true || operandString === "-") {
        return false;
    } else {
        operandString += ".";
        outputString += ".";
        updateDisplay();
        decimalCheck = true;
    }
}

function addOperator(e) {
    if (result === null) {
        resetCalculator();
        result = 0;
    }
    
    let operator = e;
    
    if(operator === "-" && operandString.length == 0) {
        operandString += "-";
        outputString += "-";
        updateDisplay();
    } else if (operandString.length > 0 && operandString !== "-") {
        operandArray[operandIndex] = Number(operandString);
        operandIndex++;
        operandString = "";

        outputString += ` ${operator} `;
        updateDisplay();
        
        operatorArray[operatorIndex] = operator;
        operatorIndex++;
        decimalCheck = false;

    } else {
        return false;
    }
}

function getResult() {
    if (operandArray.length === 0 || result === null) {
        return false;
    }
    
    if (operandString.length > 0) {
        operandArray[operandIndex] = Number(operandString);
        operandIndex++;
        operandString = "";
    } else if (operandString.length === 0) {
        outputString = outputString.slice(0, (outputString.length - 2));
        updateDisplay();
    }
    
    result = operandArray.reduce((total, currentValue, currentIndex, array) => {
        let x;
        let y;
        if (currentIndex === (array.length - 1)) {
            total = currentValue;
            return total;
        } else {
            let precedenceCheck = false;
            while(precedenceCheck === false) {
                if (operatorArray[currentIndex] === "+" || operatorArray[currentIndex] === "-") {
                    if (operatorArray[currentIndex + 1] === "*" || operatorArray[currentIndex + 1] === "/") {
                        x = array[currentIndex + 1];
                        y = array[currentIndex + 2];
                        total = math.operate(x, y, operatorArray[currentIndex + 1]);
                        array[currentIndex + 1] = total;
                        array.splice(currentIndex + 2, 1);
                        operatorArray.splice(currentIndex + 1, 1);
                    } else {
                        precedenceCheck = true;
                    }
                } else {
                    precedenceCheck = true;
                }
            }

            x = currentValue;
            y = array[currentIndex + 1];
            total = math.operate(x, y, operatorArray[currentIndex]);
            array[currentIndex + 1] = total;
            return total;
        }
    }, 0);

    if(isNaN(Number(result))) {
        outputString += ' = not allowed!';
    } else {
    outputString += ` = ${math.round(result)}`;
    }
    updateDisplay();
    result = null;
}

function updateDisplay() {
    if (outputString.length > 55) {
        alert("Too many digits!")
        return false;
    } else if(outputString.length > 49) {
        display.style.fontSize = "0.6rem";
    } else if(outputString.length > 44) {
        display.style.fontSize = "0.7rem";
    } else if(outputString.length > 40) {
        display.style.fontSize = "0.75rem";    
    } else if(outputString.length > 36) {
        display.style.fontSize = "0.85rem";
    } else if(outputString.length > 32) {
        display.style.fontSize = "0.9rem"
    } else {
        display.style.fontSize = "";
    }
    display.innerText = outputString;
}

function deleteLastInput () {
    if (result === null) {
        resetCalculator();
    } else if (operandString === "" && operatorArray.length === 0) {
        return false;
    } else if(operandString === "" && operatorArray.length !== 0) {
        outputString = outputString.slice(0, (outputString.length - 3));
        updateDisplay();
        operandString += operandArray[operandArray.length -1];
        operatorArray.pop();
        operandArray.pop();
        operandIndex--;
        operatorIndex--;
    } else if(operandString !== "") {
        operandString = operandString.slice(0, -1);
        outputString = outputString.slice(0, -1);
        updateDisplay();
    }
}

function resetCalculator() {
    operandArray = [];
    operandString = "";
    operandIndex = 0;

    operatorArray = [];
    operatorIndex = 0;

    outputString = "";

    updateDisplay();

    decimalCheck = false;
}