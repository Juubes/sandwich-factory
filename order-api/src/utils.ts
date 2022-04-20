import amqplib, { Channel, Connection, Message } from "amqplib";
import { activeOrders, Order, OrderState } from "./order-api";

const rabbitMQURL = "amqp://rabbitmq:5672/";

const TODO_QUEUE = "sandwiches-todo";
const DONE_QUEUE = "sandwiches-done";

let channel: Channel;

/**
 * Recurrent function that tries to reconnect every 3 seconds until succeeds.
 */
const reconnectRabbitMQ = async (): Promise<Connection> => {
  try {
    const connection = await amqplib.connect(rabbitMQURL);
    console.log("OrderAPI connected to RabbitMQ!");

    return connection;
  } catch (ex) {
    console.log("OrderAPI connection to RabbitMQ failed. Reconnecting in 3s.");
    return await new Promise((resolve) =>
      setTimeout(() => resolve(reconnectRabbitMQ()), 3000)
    );
  }
};

const onMessageCallback = (msg: Message | null) => {
  if (!msg) return;

  const readyOrder: Order = JSON.parse(msg.content.toString());

  // Send sandwich order back
  const order = activeOrders.find((order) => order.id === readyOrder.id);
  if (!order || !order.id) {
    channel.ack(msg);
    console.log("Acknoledged an invalid message.");
    return;
  }
  order.state = OrderState.READY;
  order.listeners.forEach((listener) => listener());

  channel.ack(msg);
};

// Configure RabbitMQ
export const configureRabbitMQ = async () => {
  const connection = await reconnectRabbitMQ();

  channel = await connection.createChannel();

  await channel.assertQueue(DONE_QUEUE);

  channel.consume(DONE_QUEUE, onMessageCallback);
};

export const queueSandwich = (
  id: number,
  username: string,
  sandwichId: Order
) => {
  const data = { id, username, sandwichId };

  if (!channel) return false;

  return channel.sendToQueue(TODO_QUEUE, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
};
