const express = require("express");

const app = express();

// Mapped from /order on proxy
app.get("/", (req, res) => {
  res.json({ message: "Hello from order API" });
});

app.post("/", (req, res) => {});

app.get("/:id", (req, res) => {
  const id = req.params.id;
});

app.listen(3531, () => {
  console.log("Order API started on port 3531.");
});
