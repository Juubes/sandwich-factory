// TODO: No REST, only RabbitMQ
import amqplib, { Connection } from "amqplib";

const rabbitMQURL = "amqp://rabbitmq:5672/";

const TODO_QUEUE = "sandwiches-todo";
const DONE_QUEUE = "sandwiches-done";

const reconnect = async (): Promise<Connection> => {
  try {
    const connection = await amqplib.connect(rabbitMQURL);
    console.log("SandwichService connected to RabbitMQ!");

    return connection;
  } catch (ex) {
    console.log(
      "SandwichService connection to RabbitMQ failed. Reconnecting in 3s."
    );
    return await new Promise((resolve) =>
      setTimeout(() => resolve(reconnect()), 3000)
    );
  }
};

(async () => {
  const connection = await reconnect();

  const channel = await connection.createChannel();

  await channel.assertQueue(TODO_QUEUE);

  channel.consume(TODO_QUEUE, (msg) => {
    const { username, sandwichId } = JSON.parse(msg!.content.toString());

    console.log(`Order arrived for ${username}:${sandwichId}! Processing...`);
    channel.ack(msg!);

    setTimeout(() => {
      console.log(`Order processed for ${username}:${sandwichId}!`);
      const data = { username, sandwichId };
      channel.sendToQueue(DONE_QUEUE, Buffer.from(JSON.stringify(data)), {
        persistent: true,
      });
    }, 3000);
  });
})();
