const express = require("express");

const app = express();

// Mapped from /user on proxy
app.get("/", (req, res) => {
  console.log("Hello")
  res.sendStatus(200);
});

app.post("/login", (req, res) => {
  res.sendStatus(200);
});

app.post("/register", (req, res) => {
  res.sendStatus(200);
});

app.post("/logout", (req, res) => {
  res.sendStatus(200);
});

app.listen(6363, () => {
  console.log("Authentication API started on port 6363.");
});
