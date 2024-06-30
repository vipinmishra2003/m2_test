const mongoose = require("mongoose");
const FacultySchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "TEACHER", "STUDENT"],
      default: "STUDENT",
    },
    status: {
      type: "String",
      default: "ACTIVE",
      enum: ["ACTIVE", "DELETE", "BLOCK", "PENDING", "REJECTED"],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "faculty",
    },
    course: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    dialing_code: {
      type: Number,
      default: +91,
    },
    phone: {
      type: Number,
      required: true,
    },
    otp: {
      type: Number,
    },
    otptime: {
      type: Number,
    },
    qr: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Faculty = mongoose.model("Faculty", FacultySchema);
module.exports = Faculty;
