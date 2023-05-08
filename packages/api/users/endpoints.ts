import { BaseEndpoint } from "../base";
import { Message, User } from "./types";

function buildMessage(message?: Partial<Message>): Message {
  return {
    id: "",
    created_at: new Date().toISOString(),
    sender_id: "",
    recipient_id: "",
    text: "",
    ...message,
  };
}

function buildUser(user?: Partial<User>): User {
  return {
    id: "",
    email: "",
    ...user,
  };
}

class UserEndpoint extends BaseEndpoint {}

export { buildMessage, buildUser };
