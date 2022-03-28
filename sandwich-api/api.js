const express = require("express");

const app = express();

const rabbitMQURL = "http://127.0.0.1:5672/";

// Mapped from /sandwich on proxy
app.get("/", (req, res) => {
  res.sendStatus(500);
});

app.post("/", (req, res) => {
  res.sendStatus(500);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.sendStatus(500);
});

app.post("/:id", (req, res) => {
  const id = req.params.id;
  res.sendStatus(500);
});

app.delete("/", (req, res) => {
  // TODO: Get user id from header
  res.sendStatus(500);
});

app.listen(7452, () => {
  console.log("Sandwich API started on port 7452.");
});
