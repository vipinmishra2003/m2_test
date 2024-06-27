
const mongoose = require('mongoose');
const faculty = require('../Models/FacultySchema');
 const Database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connection successfully');

      const adminData = {
      first_name: "Vipin",
      last_name: "Mishra",
      email: "vipin2003mishra@gmail.com",
      password: "Admin@123",
      role: "ADMIN",
      status: "ACTIVE",
      country: "India",
      state: "uttar pradesh",
      city: "pratapgarh",
      dialing_code: +91,
      phone: 6306324384,      
      // qr: adminData._id,
    };
    const existingAdmin = await faculty.findOne({$and:[{ email: adminData.email },{ role: "ADMIN" }]});
    if (!existingAdmin) {
      faculty.create(adminData)
     }
    else {
      console.log(`Default admin is created`)
    }
  }catch (error) {
    console.error(error);
  }
};
module.exports=Database;