const Faculty = require("../Models/FacultySchema");
const helper = require("../Helper/common");
const bcrypt = require("bcrypt");
module.exports = {
  Signup: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      status,
      department,
      course,
      country,
      state,
      city,
      dialing_code,
      phone,
      qr,
    } = req.body;
    try {
      const existing = await Faculty.findOne({ email: email });
      if (existing) {
        return res.status(400).json({ message: "Student already exists" });
      } else {
        await Faculty.create({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: bcrypt.hashsync(password, 10),
          role: role,
          status: status,
          department: department,
          course: course,
          country: country,
          state: state,
          city: city,
          dialing_code: dialing_code,
          phone: phone,
          qr: qr,
        });
        return res.status(200).json({ message: "Signup Successful" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  Login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const existing = await Faculty.findOne({
        $and: [{ email: email, password: password }, { role: "STUDENT" }],
      });
      if (existing.status !== "ACTIVE") {
        res.status(400).json({ message: "Invalid Credentials" });
      }
      const payload = { email: email, role: "STUDENT", _id: existing._id };
      const generatedToken = helper.tokenGenerator(payload);

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
  RequesttoAdmision: async (req, res) => {
    const { _id } = req.body;
    const existing = await Faculty.findOne({
      $and: [{ _id: _id }, { role: "student" }],
    });
    if (existing.status !== "ACTIVE") {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    if (existing.role == "STUDENT") {
      return res
        .status(200)
        .json("Student is Authorized to Request to Admision");
    }
  },
  profileupdate: async (req, res) => {
    const { _id } = req.body;
    try {
      const fetched = await Faculty.findOne({ _id: _id });
      if (fetched.status == "BLOCK") {
        res.status(300).json({ response: "profile is blocked by admin" });
      }
      if (!fetched.role == "STUDENT") {
        res.status(500).send({ message: "The role is not student" });
      }
      res.status(200).json({ message: "profile is fetched successfully" });
    } catch (error) {}
  },

  forgetpassword: async (req, res) => {
    const user = await Faculty.findOne({
      $and: [{ email: req.body.emai }, { role: "STUDENT" }],
    });

    if (user.status == "BLOCK") {
      res.status(300).json({ message: "user is blocked by admin" });
    }
    if (user) {
      await Faculty.findOneAndUpdate(
        { email: req.body.email },
        { password: req.body.password }
      );
    }
  },
  resetpassword: async (req, res) => {
    const { email, password, newpassword } = req.body;
    try {
      const existing = await Faculty.findOne({ email: email });
      if (!existing) {
        res.status(300).json({ message: "user with email not found" });
      }
      if (!user.role == "STUDENT") {
        res.status(500).json({ message: "This router is not for student" });
      }
      if (existing) {
        const success = await bcrypt.compareSync(existing.password, password);
        if (success) {
          await user.findOneAndUpdate({ email: email, password: newpassword });
          res.status(200).json({ message: "password was reset successfully" });
        }
      }
      res.status(400).json({ message: "password was not reset" });
    } catch (error) {
      res.send("Server error", error);
    }
  },

  Deleteprofile: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Faculty.findOne({ email: email, password: password });
      if (!user) {
        res.status(300).json({ message: "user with email not exist" });
      }
      if (user.password !== password) {
        res.status(400).json({ message: "please enter correct password" });
      }
      if (user.status == "BLOCK") {
        res.status.json({ message: "You Are Already blocked by Admin" });
      }
      if (user) {
        await Faculty.deleteOne(user);
        res.status(200).json({ message: "Profile is deleted successfully" });
      }
      res.status(300).json({ message: "Profile was not deleted!" });
    } catch (error) {
      res.status(500).json({ message: "There is internal error", error });
    }
  },

  checkstatusApplication: async (req, res) => {
    const { email, password } = req.body;
    try {
      const existing = await Faculty.findOne({
        email: email,
        password: password,
      });
      if (!existing) {
        res.status(500).json({ message: "user with email not exist" });
      }
      if (existing.status == "BLOCKED") {
        res.status(300).json({ message: "you are blocked by the admin" });
      }
      if (existing.password !== password) {
      }
    } catch (error) {}
  },

  Qrgenerator: async (req, res) => {
    const { email, password } = req.body;
    try {
      const existing = await Faculty.findOne({
        email: email,
        password: password,
      });
      if (!existing) {
        res.status(300).json({ message: "user with this email not exist" });
      }
      if (existing.password !== password) {
        res.send("password not matched");
      }
      if (existing) {
        await helper.generateQRCode(email, password);
      }
    } catch (error) {}
  },
};
