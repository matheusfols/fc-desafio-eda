import kafkaConnection from '../../config/kafka.config';
import { Consumer, EachMessagePayload } from 'kafkajs';

type MessageHandler = (payload: EachMessagePayload) => Promise<void>;

const KafkaConsumer = async (topic: string, messageHandler?: MessageHandler, fromBeginning?: boolean) => {
  try {
    const kafka = kafkaConnection;
    const consumer: Consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

    await consumer.connect()
    await consumer.subscribe({
      topic,
      fromBeginning
    })

    await consumer.run({
      eachMessage: async (payload) => {
        await messageHandler(payload);
      }
    })
  } catch (error) {
    throw new Error(`Kafka Consumer: ${error}`)
  }
}


export default KafkaConsumer;


// const processMessage = async ({ topic, partition, message }: EachMessagePayload) => {
//   const messageContent = message.value.toString();
//   console.log(`Received message from ${topic}: ${messageContent}`);
//   // Adicione aqui qualquer lógica adicional de processamento
// };

// const topic = 'test-topic';

// KafkaConsumer(topic, processMessage).catch(error => {
//   console.error('Error in Kafka consumer:', error);
// });

