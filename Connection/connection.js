const mongoose = require("mongoose");
const faculty = require("../Models/FacultySchema");
const bcrypt = require("bcrypt");
const Database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connection successfully");

    const adminData = {
      first_name: "Vipin",
      last_name: "Mishra",
      email: "vipin2003mishra@gmail.com",
      password: bcrypt.hashSync("Admin@123", 10),
      role: "ADMIN",
      status: "ACTIVE",
      country: "India",
      state: "uttar pradesh",
      city: "pratapgarh",
      dialing_code: +91,
      phone: 6306324384,
      // qr: adminData._id,
    };
    const existingAdmin = await faculty.findOne({
      $and: [{ email: adminData.email }, { role: "ADMIN" }],
    });
    if (existingAdmin) {
      console.log("Default Admin is already created");
    }
    if (!existingAdmin) {
      faculty.create(adminData);
      console.log(`Default admin is created`, adminData);
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = Database;
