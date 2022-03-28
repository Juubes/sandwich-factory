const express = require("express");

const app = express();

// Mapped from /user on proxy
app.post("/", (req, res) => {});

app.post("/login", (req, res) => {});

app.post("/logout", (req, res) => {});

app.get("/:username", (req, res) => {
  const username = req.params.username;
});

app.put("/:username", (req, res) => {
  const username = req.params.username;
});

app.delete("/:username", (req, res) => {
  const username = req.params.username;
});

app.listen(6363, () => {
  console.log("Authentication API started on port 6363.");
});
