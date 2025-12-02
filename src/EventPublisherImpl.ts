import EventPublisher from "./EventPublisher";
import { Subscriber } from "./Subscriber";

export default class EventPublisherImpl implements EventPublisher {
  private listeners: Subscriber[] = [];

  public addSubscriber(eventName: string, callback: Function): void {
    this.listeners.push({ eventName, callback });
  }

  public notifySubscribers(eventName: string, ...args: any[]): void {
    const filteredListeners = this.listeners.filter(
      (listener) => listener.eventName === eventName
    );
    for (const listener of filteredListeners) {
      listener.callback(...args);
    }
  }
}