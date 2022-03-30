import proxy from "http-proxy";
import { Express } from "express";

export function activateProxy(app: Express, route: string, proxy: proxy) {
  app.all(route, (req, res) => {
    const errorHandler = (e: Error) => {
      res.sendStatus(500);
      console.log(
        "Error handling " + req.method + " " + req.url + ": " + e.message
      );
    };

    const redundantPathLength = route.indexOf("*");

    req.url = req.url.substring(redundantPathLength);

    proxy.web(req, res, {}, errorHandler);
  });
}
