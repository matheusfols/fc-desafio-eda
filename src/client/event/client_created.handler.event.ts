import { EventHandlerInterface } from "../../@shared/event/event.interface";
import KafkaProducer from "../../@shared/kafka/kafka.producer";
import ClientCreatedEvent from "./client_created.event";

export default class ClientCreatedHandlerEvent implements EventHandlerInterface {
  async handle(event: ClientCreatedEvent): Promise<void> {
    await KafkaProducer('client', { value: JSON.stringify(event) })
  }
}