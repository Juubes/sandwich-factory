const express = require("express");

const app = express();

const rabbitMQURL = "http://127.0.0.1:5672/";

// Mapped from /sandwich on proxy
app.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Chicken",
      breadType: "oat",
      toppings: ["chicken", "salad", "garlic", "mayonnaise"],
    },
    {
      id: 2,
      name: "Salmon",
      breadType: "oat",
      toppings: ["salmon", "salad", "onions", "ketchup"],
    },
    {
      id: 3,
      name: "Beef",
      breadType: "roasted",
      toppings: ["beef", "bacon", "onions", "mayonnaise"],
    },
  ]);
});

app.post("/", (req, res) => {
  res.sendStatus(501);
});

app.delete("/", (req, res) => {
  const id = req.params.id;
  res.sendStatus(501);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.sendStatus(501);
});

app.post("/:id", (req, res) => {
  const id = req.params.id;
  res.sendStatus(501);
});

app.all("*", (req, res) => {
  // TODO: Get user id from header
  res.sendStatus(500);
});
app.listen(7452, () => {
  console.log("Sandwich API started on port 7452.");
});
