const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const app = express();

const secret = "agk9wt238jwejg93gsej93";

const db = {};

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
    const token = req.cookies["auth"];

    if(!token){
        return res.send("Please login");
    }

    try{
        const decodedString = jsonwebtoken.verify(token, secret);
        console.log(decodedString);
        res.send(`Welcome ${decodedString["username"]}`);
    }catch{
        res.status(403).send("Unauthorized");
    }

});

app.get("/login", (req, res) => {
    res.send(`
    <form action = "/login" method = "post">
    <label>Username</label>
    <input type = "text" name = "username" />
    <label>Password</label>
    <input type = "password" name = "password" />
    <input type = "submit" value = "login">
    </form>
    `);
});

app.post("/login", async (req, res) => {
    res.cookie("user", req.body.username);

    const hash = db[req.body.username];

    if(!hash){
        return res.status(401).end();
    }

    const isValid = await bcrypt.compare(req.body.password, hash);

    if(!isValid){
        return res.status(401).end();
    }

    //Generate token
    const payload = {
        username: req.body.username
    }

    const token = jsonwebtoken.sign(payload, secret, { expiresIn: "24h" });
    
    res.cookie("auth", token);

    res.send("Logged succesfully");

    res.end();
});


app.get("/register", (req, res) => {
    res.send(`
    <form action = "/register" method = "post">
    <label>Username</label>
    <input type = "text" name = "username" />
    <label>Password</label>
    <input type = "password" name = "password" />
    <input type = "submit" value = "login">
    </form>
    `);
});

app.post("/register", async (req, res) => {
     //Hash Password
     //const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(req.body.password, 10);

     db[req.body.username] = hash;

     res.redirect("/login");
});

app.get("/logout", (req, res) => {
    res.clearCookie("user");
    res.end();
});

app.listen(5000, () => console.log("Server is listenning on http://localhost:5000..."));