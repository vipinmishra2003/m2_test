const jwt = require("jsonwebtoken");
module.exports = {
  VerifyAdmin: async (req, res, next) => {
    const token = req.headers.authorization;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === "ADMIN") {
        return res.status(200).json(decoded);
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    next();
  },
  verifyFaculty: async (req, res) => {
    const token = req.headers.authorization;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === "FACULTY") {
        return res.status(200).json(decoded);
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    next();
  },
  verifyStudent: async (req, res) => {
    const token = req.headers.authorization;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === "STUDENT") {
        return res.status(200).json(decoded);
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    next();
  },
};
