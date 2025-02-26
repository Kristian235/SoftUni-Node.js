const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");

const cats = [
    {
        name: "Navcho",
        age: 8,
        breed: "Persian"
    },
    {
        name: "Navo",
        age: 5,
        breed: "Pers"
    }
]

const app = express();

app.engine("hbs", handlebars.engine({
    extname: "hbs"
}));
app.set("view engine", "hbs");

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log("Creating new Cat!");
    //if(Math.random() < 0.5){
    //    return res.send("Creating failed!");
    //}
    next();
});

//app.get("/styles/site.css", (req, res) => {
//    res.sendFile(path.join(__dirname, "styles", "site.css"));
//});

app.get("/", (req, res) => {
    res.render("home", { name: "Handlebars" });
});

app.get("/cats", (req, res) => {
    const filteredCats = cats.filter(cat => cat.name === "Navcho");
    console.log(filteredCats);
    res.render("cats", { cats: filteredCats });
});

app.post((req, res) => {
    res.redirect("/cats");
});

app.get("/cats/download", (req, res) => {
    const imagePath = path.join(__dirname, "images", "mountain.jpg");
    res.sendFile(imagePath);
    //res.end();
});


app.get("/cats/:catName", (req, res) => {
    const catName = req.params.catName;
    res.send(catName);
});

app.listen(5000, () => console.log("Server is listening on http://localhost:5000"));