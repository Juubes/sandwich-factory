const express = require("express");

const app = express();

const rabbitMQURL = "http://127.0.0.1:5672/";

// Mapped from /sandwich on proxy
app.get("/", (req, res) => {});

app.post("/", (req, res) => {});

app.get("/:id", (req, res) => {
  const id = req.params.id;
});

app.post("/:id", (req, res) => {
  const id = req.params.id;
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
});

app.listen(7452, () => {
  console.log("Sandwich API started on port 7452.");
});
