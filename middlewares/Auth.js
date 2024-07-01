const jwt = require("jsonwebtoken");
module.exports = {
  verifyAdmin: async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === "ADMIN") {
        req.user = decoded; // Attach decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
      } else {
        return res.status(403).json({ message: "Forbidden: Not an admin" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },

  verifyFaculty: async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === "FACULTY") {
        req.user = decoded; // Attach decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
      } else {
        return res
          .status(403)
          .json({ message: "Forbidden: Not a faculty member" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },

  verifyStudent: async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role === "STUDENT") {
        req.user = decoded; // Attach decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
      } else {
        return res.status(403).json({ message: "Forbidden: Not a student" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },
};
