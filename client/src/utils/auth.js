import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const firebaseAuth = {
  async login({ email, password }) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // 🔁 Validación con tu backend
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      throw error.message || "Login failed";
    }
  },

  async register({ email, password }) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      // 🔁 Registro con tu backend
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      throw error.message || "Registration failed";
    }
  },

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const email = user.email;
      const googleId = user.uid;

      // 🔁 Enviamos al backend para crear/validar el user
      const res = await axios.post(`${BACKEND_URL}/api/auth/google`, {
        email,
        googleId,
      });

      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      throw error.message || "Google login failed";
    }
  },

  logout() {
    return signOut(auth).then(() => {
      localStorage.removeItem("token");
    });
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};
