const mongoose = require("mongoose"); //to conect with mongooes Database

//here we defines schema
const CourseSchema = new mongoose.Schema({
  Course_name: {
    type: String,
    required: true,
  },
  Course_id: {
    type: String,
    required: true,
  },
  Course_description: {
    type: String,
    required: true,
  },
});

//here we use for to exporting the model
module.exports = mongoose.model("course", CourseSchema);
