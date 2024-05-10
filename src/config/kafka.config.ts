import { Kafka } from "kafkajs";

const kafkaConnection = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'wallet',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
})

export default kafkaConnection