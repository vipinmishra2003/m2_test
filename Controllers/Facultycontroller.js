const faculty = require("../Models/FacultySchema");
const Helper = require("../Helper/common");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const existing = await faculty.findOne({
        $and: [{ email: email }, { role: "FACULTY" }, { password: password }],
      });
      if (existing.status !== "ACTIVE") {
        res.status(400).json({ message: "Invalid Credentials" });
      }
      const payload = { email: email, role: "FACULTY", _id: existing._id };
      const generatedToken = Helper.tokenGenerator(payload);

      if (!generatedToken) {
        return res.status(404).json({ message: "Token not found" });
      }

      if (existing) {
        return res
          .status(200)
          .json({ message: "Login Successful", existing, generatedToken });
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  ApproveStudentAdmision: async (req, res) => {
    const { _id } = req.body;
    try {
      const existing = await faculty.findOne({
        $and: [{ _id: _id }, { role: "STUDENT" }],
      });
      if (!existing) {
        res.status(300).json({ message: "user with this mail not exist" });
      }
      if (existing && existing.status == "PENDING") {
        const approve = await existing.findOneAndUpdate(
          { _id: _id },
          { status: "Approved" }
        );
        res
          .status(200)
          .json({
            message: "Status of your application has been approved by faculty",
            approve,
          });
      }
      res.status(300).json({ message: "Your status is pendinf still" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  updateProfile: async (req, res) => {
    const { id } = req.params;
    const { name, role, password } = req.body;

    try {
      const existingfaculty = await faculty.findById(id);

      if (!existingfaculty) {
        return res.status(404).json({ message: "Faculty not found" });
      }

      // Update name and role
      (existingfaculty.name = name),
        (existingfaculty.role = role),
        (existingfaculty.password = password);

      await faculty.save();

      res.json({ message: "Profile updated successfully", faculty });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
};
