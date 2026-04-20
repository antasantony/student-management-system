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

    res.redirect("/students");
  });
});

router.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.log(err);
      return res.send('Error fetching Students');
    }
    res.render("students", { students: result });
  })
})
router.get("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM students WHERE id = ?", [id], (err) => {
    if (err) {
      console.log(err);
      return res.send("Error deleting student");
    }

    res.redirect("/students");
  });
});
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM students WHERE id = ?", [id], (err, result) => {
    if (err) return res.send("Error");

    res.render("editStudent", { student: result[0] });
  });
});
router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const sql =
    "UPDATE students SET name = ?, email = ?, password = ? WHERE id = ?";

  db.query(sql, [name, email, password, id], (err) => {
    if (err) return res.send("Error updating");

    res.redirect("/students");
  });
});
module.exports = router;