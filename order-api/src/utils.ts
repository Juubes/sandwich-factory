import amqplib from "amqplib";
import { activeOrders, Order, OrderState } from "./api";

const rabbitMQURL = "amqp://rabbitmq:5672/";

export let queueSandwich = (id: number, username: string, sandwich: Order) => {
  return false;
};

const TODO_QUEUE = "sandwiches-todo";
const DONE_QUEUE = "sandwiches-done";

export const reconnectRabbitMQ = async (): Promise<amqplib.Connection> => {
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
// Configure RabbitMQ
(async () => {
  const connection = await reconnectRabbitMQ();

  const channel = await connection.createChannel();

  await channel.assertQueue(DONE_QUEUE);

  channel.consume(DONE_QUEUE, (msg) => {
    const readyOrder: Order = JSON.parse(msg!.content.toString());

    // Send sandwich order back

    const order = activeOrders.find((order) => order.id === readyOrder.id);
    if (!order || !order.id) {
      channel.ack(msg!);
      console.log("Acknoledged an invalid message.");
      return;
    }
    order.state = OrderState.READY;
    order.listeners.forEach((listener) => listener());

    channel.ack(msg!);
  });

  // Replace the function when ready
  queueSandwich = (id: number, username: string, sandwichId: Order) => {
    const data = { id, username, sandwichId };

    return channel.sendToQueue(TODO_QUEUE, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
  };
})();
