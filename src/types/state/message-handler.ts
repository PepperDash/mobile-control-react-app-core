import { Message } from './message.ts';

export class MessageHandler {
  path: string;

  handler: (msg: Message) => void;

  constructor(path: string, handler: (msg: Message) => void) {
    this.path = path;
    this.handler = handler;
  }
}
