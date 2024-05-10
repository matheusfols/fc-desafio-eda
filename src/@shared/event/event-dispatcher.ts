import { EventInterface, EventDispatcherInterface, EventHandlerInterface } from "./event.interface";


export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  Register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  Unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  Clear(): void {
    this.eventHandlers = {};
  }

  async Dispatch(event: EventInterface): Promise<void> {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(async (eventHandler) => {
        await eventHandler.handle(event);
      });
    }
  }

  Has(eventName: string, eventHandler: EventHandlerInterface): boolean {
    return this.eventHandlers[eventName] && this.eventHandlers[eventName].includes(eventHandler);
  }
}
