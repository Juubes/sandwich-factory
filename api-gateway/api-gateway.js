const https = require("https");
const express = require("express");
const proxy = require("http-proxy");

const app = express();

const PORT = 8001;

const { ORDER_API_URL, AUTH_API_URL, RABBITMQ_URL } = process.env;

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
  orderService.web(req, res);
});

https.createServer(app).listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
