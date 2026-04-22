import express from "express";
import session from "express-session";
import studentRoutes from "./routes/studentRoutes"


const app = express();


app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use("/", studentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});