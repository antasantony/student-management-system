const express = require("express");
const router = express.Router();
const db = require("../config/db");

// home
router.get("/", (req, res) => {
  res.send("Student Management System Started");
});

// show signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// handle signup
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO students (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error");
    }

    res.send("Signup successful");
  });
});

module.exports = router;