import { PaginatedSaveEndpoint, SaveEndpoint } from "../base";
import { Message, User } from "./types";

export function buildUser(user?: Partial<User>): User {
  return {
    id: "",
    email: "",
    ...user,
  };
}

class MessagesEndpoint extends PaginatedSaveEndpoint<Message> {
  initial(props?: Partial<Message>): Message {
    return {
      id: "",
      created_at: new Date().toISOString(),
      sender_id: "",
      recipient_id: "",
      text: "",
      ...props,
    };
  }
}

export const messages = new MessagesEndpoint("/messages/");
