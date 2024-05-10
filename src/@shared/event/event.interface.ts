export interface EventInterface {
  date: Date
  name: string
  payload: Object;
  GetName(): string;
  GetDateTime(): Date;
  GetPayload(): Object;
  SetPayload(payload: Object): void;
}

export interface EventHandlerInterface<T extends EventInterface = EventInterface> {
  handle(event: T): void;
}

export interface EventDispatcherInterface {
  Dispatch(event: EventInterface): void;
  Register(eventName: string, eventHandler: EventHandlerInterface): void;
  Unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  Has(eventName: string, eventHandler: EventHandlerInterface): boolean;
  Clear(): void;
}