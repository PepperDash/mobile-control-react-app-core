import { Message } from './message';

export class MessageHandler {
  path: string;

  handler: (msg: Message) => void;

  constructor(path: string, handler: (msg: Message) => void) {
    this.path = path;
    this.handler = handler;
  }
}
