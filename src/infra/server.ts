
import { app } from "./express";
import dotenv from "dotenv";
// import KafkaProducer from "../@shared/kafka/kafka.producer";
// import KafkaConsumer from "../@shared/kafka/kafka.consumer";


dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

// const kf = async () => {
//   await KafkaConsumer('test-topic')
//   await KafkaProducer('test-topic', { value: 'Test message' })
// }

// kf()

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});