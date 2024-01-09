export class Message {
  type: string;

  clientId?: string | number;

  content: unknown;

  constructor(type: string, content?: unknown) {
    this.type = type;
    this.content = content;
  }
}
