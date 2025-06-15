// src/utils/auth.js
import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const firebaseAuth = {
  async login({ email, password }) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("userName", user.displayName || user.email);

      return { token, name: user.displayName || user.email };
    } catch (error) {
      throw error.message || "Login failed";
    }
  },

  async register({ email, password, name }) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("userName", name || user.displayName || user.email);

      return { token, name: name || user.displayName || user.email };
    } catch (error) {
      throw error.message || "Registration failed";
    }
  },

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("userName", user.displayName || user.email);

      return { token, name: user.displayName || user.email };
    } catch (error) {
      throw error.message || "Google login failed";
    }
  },

  logout() {
    return signOut(auth).then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    });
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};
