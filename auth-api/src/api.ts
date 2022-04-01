import express from "express";
import * as auth from "./auth";
import multer from "multer";

const app = express();

// Middleware
app.use(multer().none());

// Bodyparsers for JSON
app.use("/checkSession", express.json());

// Mapped from /user on proxy
app.get("/", (req, res) => {
  const username: string = req.get("UserID")!;
  res.json({ username });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(400);
    return;
  }

  const token = auth.register(username, password);
  if (token) res.json({ token: token });
  else res.sendStatus(403);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(400);
    return;
  }

  const token = auth.login(username, password);

  if (token) {
    res.json({ token });
  } else res.sendStatus(403);
});

app.post("/logout", (req, res) => {
  const username: string = req.get("UserID")!;
  const success = auth.logout(username);

  if (success) res.sendStatus(200);
  else res.sendStatus(500);
});

// Private route hit only by the proxy
app.post("/checkSession", (req, res) => {
  const token = req.body?.token;

  if (!token) {
    res.sendStatus(500);
    throw new Error("Didn't find a session token in request body");
  }
  const username = auth.getUserIdFromSession(token);

  if (!username) res.json({ username });
  else res.send({ username });
});
app.listen(6363, () => {
  console.log("Authentication API started on port 6363.");
});
