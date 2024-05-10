import { Message } from 'kafkajs';
import kafkaConnection from '../../config/kafka.config';


const KafkaProducer = async (topic: string, payload: Message) => {
  try {
    const kafka = kafkaConnection;
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
      topic,
      messages: [payload],
    })

    await producer.disconnect()
  } catch (error) {
    throw new Error(`Kafka Producer: ${error}`)
  }
}


export default KafkaProducer;
