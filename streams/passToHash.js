const fs = require("fs");
const crypto = require("crypto");

const readStream = fs.createReadStream("./data/input.txt", { encoding: "utf-8" });
const writeStream = fs.createWriteStream("./data/hash256.txt", { encoding: "utf-8" });

const hash = crypto.createHash("sha256");

readStream.pipe(hash).pipe(writeStream);
