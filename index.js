const express = require("express");
const connectDB = require("./Connection/connection");
const app = express();
const Adminrotes = require("./Routers/Adminroutes");
const Facultyroutes = require("./Routers/Facultyroutes");
const Studentroutes = require("./Routers/StudentRoutes");
const bodyParser = require("body-parser");
// const PORT=process.env.PORT || 4000;

//env file uses
require("dotenv").config();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));

//middleware
app.use(bodyParser.json());

//connection
connectDB();

//Routes
app.use("/get", Adminrotes);
app.use("/get", Facultyroutes);
app.use("/get", Studentroutes);

//server uses
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
