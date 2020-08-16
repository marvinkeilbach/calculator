let expression = [];
let currentOperand = 0;
const input = document.querySelectorAll

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
        return (Math.round(x * 1000) / 1000); 
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