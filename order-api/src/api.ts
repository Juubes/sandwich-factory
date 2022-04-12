import { Connection } from "amqplib";

import express from "express";
import amqplib from "amqplib";

const app = express();

const rabbitMQURL = "amqp://rabbitmq:5672/";

const TODO_QUEUE = "sandwiches-todo";
const DONE_QUEUE = "sandwiches-done";

type Order = { username: string; sandwich: number };
let queueSandwich = (username: string, sandwich: Order) => {
  return false;
};

const reconnect = async (): Promise<Connection> => {
  try {
    const connection = await amqplib.connect(rabbitMQURL);
    console.log("OrderAPI connected to RabbitMQ!");

    return connection;
  } catch (ex) {
    console.log("OrderAPI connection to RabbitMQ failed. Reconnecting in 3s.");
    return await new Promise((resolve) =>
      setTimeout(() => resolve(reconnect()), 3000)
    );
  }
};

// Configure RabbitMQ
(async () => {
  const connection = await reconnect();

  const channel = await connection.createChannel();

  await channel.assertQueue(DONE_QUEUE);

  channel.consume(DONE_QUEUE, (msg) => {
    console.log("Ready sandwich: " + msg!.content.toString());
    channel.ack(msg!);
  });

  // Replace the function when ready
  queueSandwich = (username: string, sandwichId: Order) => {
    const data = { username, sandwichId };
    console.log("Sending " + username + " sandwichId");

    return channel.sendToQueue(TODO_QUEUE, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
  };
})();

// Bodyparser
app.use(express.json());

// Mapped from /order on proxy
app.get("/", (req, res) => {
  // TODO: own orders
  res.sendStatus(501);
});

app.post("/", (req, res) => {
  const { sandwichId } = req.body;
  const username = new String(req.headers.userid).valueOf();

  if (!sandwichId || !username) {
    res.sendStatus(500);
    return;
  }

  if (!queueSandwich(username, sandwichId)) {
    console.log("Queuing failed for order " + username + ":" + sandwichId);
    res.sendStatus(500);
    return;
  }

  console.log(`Added sandwich ${username}:${sandwichId} to the queue.`);
  res.sendStatus(200);
});

app.listen(3531, () => {
  console.log("Order API started on port 3531.");
});
