const express = require("express");
const session = require("express-session");
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

const studentRoutes = require("./routes/studentRoutes");

app.use("/", studentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});