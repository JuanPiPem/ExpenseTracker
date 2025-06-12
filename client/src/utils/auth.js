// src/utils/auth.js

export const fakeAuth = {
  login({ email, password }) {
    return new Promise((resolve, reject) => {
      if (email && password) {
        localStorage.setItem("token", "mock-token-123");
        resolve("Logged in");
      } else {
        reject("Missing credentials");
      }
    });
  },

  register({ email, password }) {
    return new Promise((resolve, reject) => {
      if (email && password) {
        resolve("User registered (mock)");
      } else {
        reject("Missing data");
      }
    });
  },

  logout() {
    localStorage.removeItem("token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};
