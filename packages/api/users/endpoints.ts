import { Message } from "./types";

function buildMessage(message: Partial<Message>): Message {
  return {
    id: "",
    created_at: new Date().toISOString(),
    sender_id: "",
    text: "",
    ...message,
  };
}

export { buildMessage };
