import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";

export const useAuthStore = defineStore("auth", {
  state() {
    return {
      user: null,
    };
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.user && !!state.user.accessToken;
    },
  },
  actions: {
    loadAuthState() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
    async login(user) {
      const response = await AuthService.login(user);

      if (!response.accessToken) {
        this.logout();
        throw new Error("Whoops, no access token found!");
      }

      this.user = response;

      localStorage.setItem("user", JSON.stringify(response));
	  

      return response;
    },
    register(user) {
      this.user = null;
      return AuthService.register(user);
    },
  },
});
