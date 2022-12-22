import { defineStore, acceptHMRUpdate } from "pinia";

export enum AlertType {
  Info = "info",
  Danger = "danger",
  Success = "success",
  Primary = "primary",
}

export type AlertMessage = {
  message: string;
  type: AlertType;
};

export interface AlertState {
  messages: AlertMessage[];
}

const useAlertStore = defineStore("alert", {
  state: (): AlertState => ({
    messages: [],
  }),
  getters: {
    hasMessages(): boolean {
      return this.messages.length > 0;
    },
  },
  actions: {
    clearMessages() {
      this.messages = [];
    },
    addMessage(message: AlertMessage) {
      this.messages.push(message);
    },
    removeMessage(idx: number) {
      this.messages.splice(idx, 1);
    },
    addDangerMessage(message: string) {
      this.addMessage({ message, type: AlertType.Danger });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot));
}

export default useAlertStore;
