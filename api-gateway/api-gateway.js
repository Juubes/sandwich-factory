const https = require("https");
const express = require("express");
const proxy = require("http-proxy");
const fs = require("fs");

const app = express();

const PORT = 8001;

const orderAPI = proxy.createProxyServer({
  secure: true,
  changeOrigin: true,
  target: "http://localhost:3531",
});

const authAPI = proxy.createProxyServer({
  secure: true,
  changeOrigin: true,
  target: "http://localhost:3531",
});

const sandwichAPI = proxy.createProxyServer({
  secure: true,
  changeOrigin: true,
  target: "http://localhost:7452", 
});

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json({ status: "OK", code: "200" });
});

app.all("/order", (req, res) => {
  // TODO: Auth, ratelimiting
  orderAPI.web(req, res);
});

app.all("/user", (req, res) => {
  // TODO: Auth, ratelimiting
  authAPI.web(req, res);
});

app.all("/sandwich", (req, res) => {
  // TODO: Auth, ratelimiting
  sandwichAPI.web(req, res);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
