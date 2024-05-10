import EventDispatcher from './event-dispatcher';
import { EventHandlerInterface, EventInterface } from './event.interface';


class TestEvent implements EventInterface {
  date: Date;
  name: string;
  payload: Object;
  GetName(): string {
    return 'TestEvent';
  }
  GetDateTime(): Date {
    return new Date();
  }
  GetPayload(): Object {
    return {};
  }
  SetPayload(payload: Object): void { }
}

class TestEventHandler implements EventHandlerInterface {
  handle(event: EventInterface): void { }
}

describe('EventDispatcher', () => {
  let dispatcher: EventDispatcher;
  let eventHandler: EventHandlerInterface;
  let event: EventInterface;

  beforeEach(() => {
    dispatcher = new EventDispatcher();
    eventHandler = new TestEventHandler();
    event = new TestEvent();
  });

  test('should register event handler', () => {
    dispatcher.Register(event.GetName(), eventHandler);
    expect(dispatcher.getEventHandlers[event.GetName()]).toContain(eventHandler);
  });

  test('should unregister event handler', () => {
    dispatcher.Register(event.GetName(), eventHandler);
    dispatcher.Unregister(event.GetName(), eventHandler);
    expect(dispatcher.getEventHandlers[event.GetName()]).not.toContain(eventHandler);
  });

  test('should clear all event handlers', () => {
    dispatcher.Register(event.GetName(), eventHandler);
    dispatcher.Clear();
    expect(dispatcher.getEventHandlers).toEqual({});
  });

  test('should dispatch event to handler', () => {
    const handleSpy = jest.spyOn(eventHandler, 'handle');
    dispatcher.Register(event.GetName(), eventHandler);
    dispatcher.Dispatch(event);
    expect(handleSpy).toHaveBeenCalledWith(event);
  });

  test('should check if event handler is registered', () => {
    dispatcher.Register(event.GetName(), eventHandler);
    expect(dispatcher.Has(event.GetName(), eventHandler)).toBe(true);
    dispatcher.Unregister(event.GetName(), eventHandler);
    expect(dispatcher.Has(event.GetName(), eventHandler)).toBe(false);
  });
});