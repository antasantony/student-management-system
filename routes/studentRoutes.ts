import express, { Request, Response } from "express";
import db from "../config/db";
import { signup } from "../controllers/studentController";

const router = express.Router();

// Extend session type
declare module "express-session" {
  interface SessionData {
    user?: any;
  }
}

// home
router.get("/", (req: Request, res: Response) => {
  res.send("Student Management System Started");
});

// show signup page
router.get("/signup", (req: Request, res: Response) => {
  res.render("signup");
});

// handle signup
router.post("/signup", signup);

// login page
router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

// handle login
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM students WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err: any, results: any) => {
    if (err) return res.send("Error");

    if (results.length > 0) {
      req.session.user = results[0];
      res.redirect("/dashboard");
    } else {
      res.send("Invalid credentials");
    }
  });
});

// dashboard
router.get("/dashboard", (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.render("dashboard", { user: req.session.user });
});

// get all students
router.get("/students", (req: Request, res: Response) => {
  db.query("SELECT * FROM students", (err: any, result: any) => {
    if (err) {
      console.log(err);
      return res.send("Error fetching Students");
    }
    res.render("students", { students: result });
  });
});

// delete
router.get("/delete/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  db.query("DELETE FROM students WHERE id = ?", [id], (err: any) => {
    if (err) {
      console.log(err);
      return res.send("Error deleting student");
    }

    res.redirect("/students");
  });
});

// edit page
router.get("/edit/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM students WHERE id = ?",
    [id],
    (err: any, result: any) => {
      if (err) return res.send("Error");

      res.render("editStudent", { student: result[0] });
    }
  );
});

// update
router.post("/edit/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const sql =
    "UPDATE students SET name = ?, email = ?, password = ? WHERE id = ?";

  db.query(sql, [name, email, password, id], (err: any) => {
    if (err) return res.send("Error updating");

    res.redirect("/students");
  });
});

// logout
router.get("/logout", (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

export default router;