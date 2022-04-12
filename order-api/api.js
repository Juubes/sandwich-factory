const express = require("express");

const app = express();

// Bodyparser
app.use(express.json());

// Mapped from /order on proxy
app.get("/", (req, res) => {
  res.json({ message: "Hello from order API" });
});

app.post("/", (req, res) => {
  const { sandwichId } = req.body;
  const username = req.headers.userid;

  // TODO: Add to rabbitmq




  console.log(`Added sandwich ${username}:${sandwichId} to the queue.`);

  res.sendStatus(200);
});

app.listen(3531, () => {
  console.log("Order API started on port 3531.");
});
