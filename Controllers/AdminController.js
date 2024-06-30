const faculty = require("../Models/FacultySchema");
const CourseSchema = require("../Models/CourseSchema");
const mongoosePaginate = require("mongoose-paginate-v2");
faculty.plugin(mongoosePaginate);
// const { student, faculty } = require("../Models/DepartmentSchema");
const helper = require("../Helper/common");
module.exports = {
  createfaculty: async (req, res) => {
    const { firstname, lastname, email, status, department, role } = req.body;
    try {
      const existingfaculty = await faculty.findOne({
        $and: [{ email: email }, { role: "TEACHER" }],
      });
      if (existingfaculty) {
        return res.status(400).json({ message: "faculty already exists" });
      } else {
        const Generatedpassword = math.floor(Math.random() * 10000 + 60000);
        await faculty.create({
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: helper.sendPassword(
            email,
            "your password is",
            Generatedpassword
          ),
          role: role,
          status: status,
          department: department,
        });
        return res
          .status(200)
          .json({ message: "faculty created successfully" });
      }
    } catch (error) {
      res.json({ message: error.message });
    }
    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  },

  Adminlogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and Password are required" });
      }

      const foundUser = await faculty.findOne({
        $and: [
          { $and: [{ email: email }, { role: "ADMIN" }] },
          { password: password },
        ],
      });

      if (!foundUser) {
        return res
          .status(401)
          .json({ message: "Admin with this email not found" });
      }

      if (foundUser.role !== "ADMIN") {
        return res.status(404).json({ message: "Unauthorized Access" });
      }

      const payload = { email: email, role: foundUser.role };

      const generatedToken = helper.tokenGenerator(payload);

      if (!generatedToken) {
        return res.status(404).json({ message: "Token not found" });
      }
      return res
        .status(200)
        .json({ message: "Login Successfull", generatedToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getfaculty: async (req, res) => {
    try {
      if (!req.user || !req.user.role == "ADMIN") {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const allfaculty = await faculty
        .find({ $and: [{ email: req.body.email }, { status: "ACTIVE" }] })
        .populate("department")
        .helper.pagination(1, 10, faculty);

      return res
        .status(201)
        .json({ message: "All faculty are fetched successfully", allfaculty });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in fetching faculty" });
    }
  },

  getStudentById: async (req, res) => {
    const { _id } = req.query;
    try {
      if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const user = await faculty
        .findOne({ _id: _id, status: "ACTIVE" })
        .populate("department")
        .helper.pagination(1, 10, faculty);

      if (!user) {
        return res.status(404).json({ message: "not found" });
      }
      return res
        .status(200)
        .json({ message: "User data fetched successfully", user });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  getfacultyByDepartment: async (req, res) => {
    const { departmentId } = req.params;

    try {
      const department = await faculty
        .findById(departmentId)
        .populate("faculty")
        .helper.pagination(1, 10, faculty);

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      res.json(department);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  createDepartment: async (req, res) => {
    const { department } = req.body;
    try {
      if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const existingDepartment = await CourseSchema.findOne({
        department: department,
      });
      if (existingDepartment) {
        return res.status(400).json({ message: "Department already exists" });
      }

      await faculty.create({
        department: department,
      });

      return res
        .status(200)
        .json({ message: "Department created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  createCourse: async (req, res) => {
    const { department, course } = req.body;
    try {
      if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const existingCourse = await faculty.findOne({
        $and: [{ department: department }, { course: course }],
      });
      if (existingCourse) {
        return res.status(400).json({ message: "Course already exists" });
      }

      await faculty.create({
        department: department,
        course: course,
      });

      return res.status(200).json({ message: "Course created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  },
};
