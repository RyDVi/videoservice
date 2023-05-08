export interface User {
  readonly id: string;
  email: string;
}

export interface Message {
  id: string;
  text: string;
  sender_id: string;
  recipient_id: string;
  created_at: string;
}
