function generatePass() {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random()
            * str.length + 1);
 
        pass += str.charAt(char)
    }
 
    return pass;
}
 
console.log(generatePass());

const fs = require("fs");

const writeStream = fs.createWriteStream("./data/input.txt", { encoding: "utf-8" });

for(let i = 0; i < 10000; i++){
    writeStream.write(`${generatePass()}\n`);
}
writeStream.end();