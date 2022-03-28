import express from "express";
import * as auth from "./auth";

const app = express();

// Mapped from /user on proxy
app.get("/", (req, res) => {
  const username: string = req.get("UserID")!;
  res.json({ username });
});

app.post("/login", (req, res) => {
  const username: string = req.get("UserID")!;
  const password: string = req.get("UserPassword")!;

  const token = auth.login(username, password);

  if (token) {
    res.json({ token });
  } else res.sendStatus(403);
});

app.post("/register", (req, res) => {
  const username: string = req.get("UserID")!;
  const password: string = req.get("UserPassword")!;
  const success = auth.register(username, password);
  if (success) res.sendStatus(200);
  else res.sendStatus(403);
});

app.post("/logout", (req, res) => {
  const username: string = req.get("UserID")!;
  const success = auth.logout(username);

  if (success) res.sendStatus(200);
  else res.sendStatus(500);
});

// Private route hit only by the proxy
app.get("/checkSession/:session", (req, res) => {
  const session = req.params.session;

  const username = auth.getUserIdFromSession(session);
  if (!username) res.send({ username });
  else res.sendStatus(400);
});
app.listen(6363, () => {
  console.log("Authentication API started on port 6363.");
});
