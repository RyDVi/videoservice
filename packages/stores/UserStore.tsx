import { makeAutoObservable, runInAction } from "mobx";
import { MainStore } from "./MainStore";
import {
  AuthData,
  LoginData,
  Message,
  SignupData,
  User,
  api,
  buildUser,
  messages as messagesApi,
} from "@modules/api";
import { uuid4 } from "../utils/utils";
import { signup } from "../../apps/client/src/paths";

const CURRENT_USER_KEY = "current_user";

abstract class UserStorage {
  abstract currentUserId: string;
  abstract getMessages(): Promise<Message[]>;
  abstract sendMessage(message: Message): Promise<void>;
}

class LocalUserStorage extends UserStorage {
  currentUserId: string;
  localStorage: Storage;

  constructor(currentUserId: string, localStorage: Storage) {
    super();
    this.currentUserId = currentUserId;
    this.localStorage = localStorage;
  }

  getMessagesKeyForUser(userId: string): string {
    return `messages_for_user:${userId}`;
  }

  getMessages(): Promise<Message[]> {
    const messagesStr = localStorage.getItem(
      this.getMessagesKeyForUser(this.currentUserId)
    );
    try {
      const messages = JSON.parse(messagesStr || "");
      return Promise.resolve(messages);
    } catch {
      return Promise.resolve([]);
    }
  }

  async sendMessage(message: Message): Promise<void> {
    const messages = await this.getMessages();
    localStorage.setItem(
      this.getMessagesKeyForUser(this.currentUserId),
      JSON.stringify([...messages, { ...message, id: uuid4() }])
    );
    return Promise.resolve();
  }
}

class ApiUserStorage extends UserStorage {
  currentUserId: string;

  constructor(currentUserId: string) {
    super();
    this.currentUserId = currentUserId;
  }

  getMessages(): Promise<Message[]> {
    throw new Error("TODO: need implement");
    // messagesApi.list({})
  }
  sendMessage(message: Message): Promise<void> {
    throw new Error("TODO: need implement");
  }
}

export class UserStore {
  mainStore: MainStore;
  currentUser: User;
  authData?: AuthData;
  storage: UserStorage;
  messages: Record<string, Message[]> = {}; //в качестве ключа - с кем общается текущий юзер

  constructor(mainStore: MainStore) {
    makeAutoObservable(this);
    this.mainStore = mainStore;

    this.currentUser = this.getCurrentUserFromLocalStorage();
    this.saveCurrentUserToLocalStorage(); // сохраняем, потому что изначально юзера может не быть в localStorage
    // Начинаем работать с удаленным хранилищем, либо сохраняем локально, если юзер не авторизован
    this.storage = this.getStorage();
    this.initMessagesFromStorage();
  }

  private getCurrentUserFromLocalStorage(): User {
    const currentUserStr = localStorage.getItem(CURRENT_USER_KEY);
    try {
      const user = JSON.parse(currentUserStr || ""); // если currentUserStr не определен, то передаем пустую ошибку, чтобы вызвать ошибку
      return user;
    } catch {
      return buildUser({ id: uuid4() });
    }
  }

  private saveCurrentUserToLocalStorage() {
    if (!this.currentUser) {
      return;
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(this.currentUser));
  }

  private getStorage(): UserStorage {
    const currentUserId = this.currentUser.id;
    if (this.authData) {
      return new ApiUserStorage(currentUserId);
    }
    return new LocalUserStorage(currentUserId, this.mainStore.localStorage);
  }

  private async initMessagesFromStorage() {
    const messages = await this.storage.getMessages();
    this.messages = messages.reduce<Record<string, Message[]>>(
      (acc, curVal) => {
        const recipientId =
          curVal.recipient_id === this.storage.currentUserId
            ? curVal.sender_id
            : curVal.recipient_id;
        if (acc[recipientId]) {
          acc[recipientId] = [...acc[recipientId], curVal];
        } else {
          acc[recipientId] = [curVal];
        }
        return acc;
      },
      {}
    );
  }

  get recommendationMessagesKey() {
    if (!this.currentUser) {
      return "recommendation_messages";
    }
    return `recommendation_messages:${this.currentUser.id}`;
  }

  get recommendationMessages() {
    return this.messages[this.recommendationMessagesKey] || [];
  }

  async sendMessage(message: Message) {
    await this.storage.sendMessage(message);
    await this.initMessagesFromStorage();
    return Promise.resolve();
  }
}
