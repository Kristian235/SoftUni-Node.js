const messageBroker = require('./messageBroker');
messageBroker.subscribe('request', add);

function add(data){
    console.log("Reporting service: " + data);
}

module.exports = add;