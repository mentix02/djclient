import { defineStore, acceptHMRUpdate } from "pinia";

import type { LoginResponse } from "@/api/types/auth";

type AuthStore = {
  token?: string;
  username?: string;
};

const useAuthStore = defineStore("auth", {
  state: (): AuthStore => ({
    token: undefined,
    username: undefined,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this.token;
    },
  },
  actions: {
    login(response: LoginResponse) {
      this.token = response.auth_token;
      this.username = response.username;
    },
    logout() {
      this.$reset();
    },
  },
  persist: {
    enabled: true,
    strategies: [{ key: "auth", storage: window.localStorage }],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export default useAuthStore;
