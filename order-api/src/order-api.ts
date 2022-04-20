import express from "express";
import SseStream from "ssestream";
import { configureRabbitMQ, queueSandwich } from "./utils";

const app = express();

export enum OrderState {
  READY,
  COOKING,
}

export type Order = {
  id: number;
  username: string;
  sandwich: number;
  listeners: Function[];
  state: OrderState;
};

export const activeOrders: Order[] = [];

(async () => {
  await configureRabbitMQ();
})();

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

  const id = Math.floor(Math.random() * 1e10);
  if (!queueSandwich(id, username, sandwichId)) {
    console.log("Queuing failed for order " + username + ":" + sandwichId);
    res.sendStatus(500);
    return;
  }

  activeOrders.push({
    id,
    username,
    sandwich: sandwichId,
    listeners: [],
    state: OrderState.COOKING,
  });

  console.log(`Added sandwich ${username}:${sandwichId} to the queue.`);
  res.sendStatus(200);
});

app.get("/receive", (req, res) => {
  const username = new String(req.headers.userid).valueOf();

  const stream = new SseStream(req);
  stream.pipe(res);

  const sendStatus = () => {
    // Send own orders back
    const ownOrders = activeOrders.filter(
      (order) => order.username === username
    );

    console.log("Sending status");

    stream.writeMessage({
      data: {
        type: "status",
        orders: ownOrders
          .map((order) => {
            return {
              id: order.id,
              sandwich: order.sandwich,
              state: order.state,
            };
          })
          .reverse(),
      },
    });

    // Drop connection if no more orders
    if (ownOrders.some((order) => order.state !== OrderState.READY)) return;

    stream.unpipe(res);
    res.end();
    clearInterval(interval);

    // Clear listeners
    ownOrders.forEach((order) => (order.listeners = []));
  };

  // Keep-alive every 10s
  const interval = setInterval(sendStatus, 1000);

  // Send status on connection
  sendStatus();

  // Send status when order is done.
  const ownOrders = activeOrders.filter((order) => order.username === username);

  // Set up a listener for when order is ready
  ownOrders.forEach((order: Order) => {
    order.listeners.push(sendStatus);
  });
});

app.listen(3531, () => {
  console.log("Order API started on port 3531.");
});
