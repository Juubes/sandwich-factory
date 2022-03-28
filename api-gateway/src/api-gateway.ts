import express from "express";
import proxy from "http-proxy";
import * as auth from "./auth";

const app = express();
const PORT = 8001;

const PUBLIC_ROUTES = [
  // Check if API is online
  { method: "GET", pathMatch: "^$|^/$" },

  // List sandwiches
  { method: "GET", pathMatch: "^/sandwich/$" },

  // Register
  { method: "POST", pathMatch: "^/user/register/$" },

  // Login
  { method: "POST", pathMatch: "^/user/login/$" },
];

const USER_ROUTES = [
  // Logout
  { method: "POST", pathMatch: "^/user/logout/$" },

  // Get own data
  { method: "GET", pathMatch: "^/user/$" },

  // Delete own user
  { method: "DELETE", pathMatch: "^/user/$" },

  // Get own orders
  { method: "GET", pathMatch: "^/order/$" },

  // Create order
  { method: "POST", pathMatch: "^/order/$" },
];

const orderAPI = proxy.createProxyServer({
  changeOrigin: true,
  target: "http://order-api:3531",
});

const authAPI = proxy.createProxyServer({
  changeOrigin: true,
  target: "http://auth-api:6363",
});

const sandwichAPI = proxy.createProxyServer({
  changeOrigin: true,
  target: "http://sandwich-api:7452",
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

// Authorization checks. Good requests return.
app.use((req, res, next) => {
  // Normalize URL
  req.url = req.url.toLowerCase();
  req.method = req.method.toUpperCase();
  if (!req.url.endsWith("/")) req.url += "/";

  console.log("INFO: " + req.method + " for " + req.url);

  // If the route is found, continue
  if (
    PUBLIC_ROUTES.some((route) => {
      if (route.method !== req.method) return false;
      if (!req.url.match(route.pathMatch)) return false;
      return true;
    })
  ) {
    return next();
  }

  // If the route is found, continue
  if (
    USER_ROUTES.some((route) => {
      if (route.method !== req.method) return false;
      if (!req.url.match(route.pathMatch)) return false;
      return true;
    })
  ) {
    // Check auth
    const sessionToken = auth.parseSessionToken(req.cookies);
    if (auth.checkAuth(sessionToken)) return next();
  }

  res.sendStatus(403);
  console.log("Request blocked for " + req.method + " " + req.url);
});

// Health check -- redundant
app.get("/", (req, res) => {
  res.json({ status: "OK", code: "200" });
});

app.all("/order/*", (req, res) => {
  req.url = req.url.substring(6);

  orderAPI.web(req, res, {}, (e) => {
    res.sendStatus(500);
    console.log(
      "Error handling " + req.method + " " + req.url + ": " + e.message
    );
  });
});

app.all("/user/*", (req, res) => {
  req.url = req.url.substring(6);
  authAPI.web(req, res, {}, (e) => {
    res.sendStatus(500);
    console.log(
      "Error handling " + req.method + " " + req.url + ": " + e.message
    );
  });
});

app.all("/sandwich/*", (req, res) => {
  req.url = req.url.substring(10);
  sandwichAPI.web(req, res, {}, (e) => {
    res.sendStatus(500);
    console.log(
      "Error handling " + req.method + " " + req.url + ": " + e.message
    );
  });
});

// The catch-all
app.all("*", (req, res) => {
  res.sendStatus(500);
  console.error("User requested for a known route and failed!");
  console.error("Failed: " + req.method + " " + req.url);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
