const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Student Management System Started");
});

app.get("/signup", (req, res) => {
  res.send("Signup Page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});