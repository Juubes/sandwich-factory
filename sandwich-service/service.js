// TODO: No REST, only RabbitMQ
const amqplib = require("amqplib");

const rabbitMQURL = "amqp://localhost:5672/";

const TODO_QUEUE = "sandwiches-todo";
const DONE_QUEUE = "sandwiches-done";

(async () => {
  const connection = await amqplib.connect(rabbitMQURL);
  const channel = await connection.createChannel();

  // channel.assertExchange()
  await channel.assertQueue(TODO_QUEUE);

  setInterval(async () => {
    const data = Buffer.from(`sandwich-${Math.random()}`, "utf-8")
    channel.sendToQueue(TODO_QUEUE, data, { persistent: true })
  }, 1000);

  channel.consume(TODO_QUEUE, (msg) => {
    console.log("Arrived message: ");
    console.log(msg.content.toString());
    channel.ack(msg);
  });
})()