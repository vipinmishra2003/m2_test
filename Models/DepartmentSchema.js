const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
  },
  department: {
    type: String,
    enum: ["CSE", "MECH", "EC", "CL"],
  },
});

// Define a schema for faculty
const facultySchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
  },
  department: {
    type: String,
    enum: ["CSE", "MECH", "EC", "CL"],
  },
});

const faculty = mongoose.model("faculty", facultySchema);
const student = mongoose.model("student", studentSchema);

module.exports = { faculty, student };
