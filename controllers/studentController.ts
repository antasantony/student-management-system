import { Request, Response } from "express";
import { createStudent } from "../models/studentModel";

export const signup = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  createStudent(name, email, password)
    .then(() => res.redirect("/students"))
    .catch((err: any) => {
      console.log(err);
      res.send("Error");
    });
};