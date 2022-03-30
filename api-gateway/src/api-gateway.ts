import express from "express";
import axios from "axios";
import proxy from "http-proxy";
import cookies from "cookie-parser";
import { activateProxy } from "./utils";

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
app.use(cookies());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

// Authorization checks. Good requests return.
app.use(async (req, res, next) => {
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

  // Check if route is whitelisted
  const routeFound = USER_ROUTES.some((route) => {
    if (route.method !== req.method) return false;
    if (!req.url.match(route.pathMatch)) return false;
    return true;
  });

  if (!routeFound) {
    res.sendStatus(403);
    console.log("Request blocked for " + req.method + " " + req.url);
    return;
  }

  // Check auth
  const token = req.cookies.token;
  if (!token) {
    res.sendStatus(403);
    return;
  }

  // Authenticate user with the session token
  let username;
  try {
    // Request to Authentication service
    const response = await axios.post("http://auth-api:6363/checkSession/", {
      token,
    });
    const data = await response.data;
    username = data?.username;
  } catch (e) {
    res.sendStatus(500);
    console.log("Session fetching failed: " + e);
    return;
  }

  // Wrong password
  if (!username) {
    res.status(403).send("Invalid session token");
  } else {
    console.log("User from cookie identified: " + username);
    next();
  }
  return;
});

// Health check -- redundant
app.get("/", (req, res) => {
  res.json({ status: "OK", code: "200" });
});

activateProxy(app, "/user/*", authAPI);
activateProxy(app, "/order/*", orderAPI);
activateProxy(app, "/sandwich/*", sandwichAPI);

// The catch-all
app.all("*", (req, res) => {
  res.sendStatus(500);
  console.error("User requested for a known route and failed!");
  console.error("Failed: " + req.method + " " + req.url);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
