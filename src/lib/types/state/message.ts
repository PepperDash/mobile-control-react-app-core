export interface Message {
  type: string;

  clientId?: string | number;

  content: unknown;
}

export interface EventContent {
  eventType: string;
}
