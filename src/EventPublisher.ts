export default interface EventPublisher {
  addSubscriber(eventName: string, callback: Function): void;
}