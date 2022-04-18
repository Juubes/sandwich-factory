import express from "express";
import { queueSandwich } from "./utils";
import SseStream from "ssestream";

const app = express();

export type Order = {
  id: number;
  username: string;
  sandwich: number;
  listeners: Function[];
};

export const activeOrders: Order[] = [];

// Bodyparser
app.use(express.json());

// Mapped from /order on proxy
app.get("/", (req, res) => {
  const username = new String(req.headers.userid).valueOf();
  res.json(activeOrders.filter((order) => order.username === username));
});

app.post("/", (req, res) => {
  const { sandwichId } = req.body;
  const username = new String(req.headers.userid).valueOf();

  if (!sandwichId || !username) {
    res.sendStatus(500);
    return;
  }

  const id = Math.random();
  if (!queueSandwich(id, username, sandwichId)) {
    console.log("Queuing failed for order " + username + ":" + sandwichId);
    res.sendStatus(500);
    return;
  }

  activeOrders.push({ id, username, sandwich: sandwichId, listeners: [] });
  console.log(`Added sandwich ${username}:${sandwichId} to the queue.`);
  res.sendStatus(200);
});

app.get("/receive", (req, res) => {
  const username = new String(req.headers.userid).valueOf();
  const sseStream = new SseStream(req);
  sseStream.pipe(res);

  // Send own orders back
  console.log(username);

  const ownOrders = activeOrders.filter((order) => {
    return order.username === username;
  });

  console.log("Own orders: " + ownOrders.length);

  sseStream.writeMessage({
    event: "status",
    data: ownOrders.map((order) => {
      order.id, order.sandwich, order.username;
    }),
  });
  sseStream.writeMessage({
    event: "message",
    data: ownOrders.map((order) => {
      order.id, order.sandwich, order.username;
    }),
  });
  // sseStream.write({
  //   event: "status",
  //   data: ownOrders.map((order) => {
  //     order.id, order.sandwich, order.username;
  //   }),
  // });
  console.log("Status sent: " + ownOrders);

  if (ownOrders.length === 0) {
    console.log("No orders");
    res.end();
    return;
  }

  // Send ready order when done.
  ownOrders.forEach((order: Order) => {
    order.listeners.push(() => {
      // sseStream.writeMessage(
      //   {
      //        },
      //   "utf-8"
      // );
      sseStream.emit(
        "data",
        Buffer.from(
          JSON.stringify({ event: "ready", sandwich: order.sandwich })
        )
      );
      console.log("Sent sandwich back");
    });
  });

  res.on("close", () => {
    sseStream.unpipe(res);
    res.end();
  });
});

app.listen(3531, () => {
  console.log("Order API started on port 3531.");
});
