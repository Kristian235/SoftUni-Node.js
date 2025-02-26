const mongoose = require("mongoose");
const Student = require("./models/Student");

mongoose.connect("mongodb://localhost:27017/test")
    .then(() => console.log("DB connected sucesfully!"));


Student.create({
    name: "Qn",
    age: 14,
}).then(data => console.log(data));

//Get data
Student.find()
   .then(students => {
    students.forEach(student => console.log(student.getInfo()));
   })