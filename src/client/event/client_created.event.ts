import { EventInterface } from "../../@shared/event/event.interface";


export default class ClientCreatedEvent implements EventInterface {
  name: string;
  date: Date;
  payload: Object;

  constructor() {
    this.name = 'ClientCreatedEvent'
    this.date = new Date()
  }

  GetName(): string {
    return this.name
  }
  GetDateTime(): Date {
    return this.date
  }
  GetPayload(): Object {
    return this.payload
  }
  SetPayload(payload: Object): void {
    this.payload = payload
  }
}