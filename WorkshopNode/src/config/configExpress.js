const express = require("express");
const path = require("path");

function configExpress(app){
    app.use(express.static(path.resolve("src/public")));
    app.use(express.urlencoded({extended: false}));
}

module.exports = configExpress;