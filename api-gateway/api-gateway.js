const https = require("https");
const express = require("express");
const proxy = require("http-proxy");
const fs = require("fs");

const app = express();

const PORT = 8001;

const orderService = proxy.createProxyServer({
  secure: true,
  changeOrigin: true,
  target: ORDER_API_URL,
});

const authService = proxy.createProxyServer({
  secure: true,
  changeOrigin: true,
  target: AUTH_API_URL,
});

const rabbitmqService = proxy.createProxyServer({
  secure: true,
  changeOrigin: true,
  target: RABBITMQ_URL,
});

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json({ status: "OK", code: "200" });
});

app.all("/order", (req, res) => {
  // TODO: Auth, ratelimiting
  orderService.web(req, res);
});

app.all("/sandwich", (req, res) => {
  // TODO: Auth, ratelimiting
  sandwichService.web(req, res);
});

app.all("/user", (req, res) => {
  // TODO: Auth, ratelimiting
  authService.web(req, res);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
