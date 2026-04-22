import db from "../config/db";

export const createStudent = (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO students (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};