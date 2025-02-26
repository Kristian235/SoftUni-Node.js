const is = require('is');

function calc(a, b){
    if(!is.integer(a) || !is.integer(b)){
        throw new Error("Arguments are not integers");
    }
    return a * b;
}

module.exports = calc;