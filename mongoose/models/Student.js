const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 15
    },
    age: Number,
});

studentSchema.methods.getInfo = function(){
    return `I am ${this.age} years old`;
}

const Student = mongoose.model("Student", studentSchema);

/*const student = new Student({
    name: "Pesho",
    age: 17,
});*/

//console.log(student);

//Save data
/*student.save()
   .then(createdStudent => {
    console.log("Student saved!");
    console.log(createdStudent);
   });
*/

module.exports = Student;