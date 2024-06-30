const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
  },
  { timestamps: true }
);
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
