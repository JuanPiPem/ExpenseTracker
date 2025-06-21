// src/utils/auth.js
import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

// Helper function to extract first name only
const getFirstName = (fullName, email = "") => {
  if (!fullName && !email) return "User";

  // If it's an email, extract the part before @
  if (fullName && fullName.includes("@")) {
    const emailName = fullName.split("@")[0];
    // Capitalize first letter and remove numbers/special chars
    return (
      emailName.charAt(0).toUpperCase() +
      emailName.slice(1).replace(/[0-9._-]/g, "")
    );
  }

  // If we have an email but no displayName, use email
  if (!fullName && email) {
    const emailName = email.split("@")[0];
    return (
      emailName.charAt(0).toUpperCase() +
      emailName.slice(1).replace(/[0-9._-]/g, "")
    );
  }

  // If it's a full name, take only the first part
  if (fullName) {
    const firstName = fullName.split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  return "User";
};

export const firebaseAuth = {
  async login({ email, password }) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const token = await user.getIdToken();
      // For email login, use displayName if available, otherwise extract from email
      const firstName = getFirstName(user.displayName, user.email);

      localStorage.setItem("token", token);
      localStorage.setItem("userName", firstName);

      return { token, name: firstName };
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
      // For registration, use the name field directly (first name only)
      const firstName = getFirstName(name);

      localStorage.setItem("token", token);
      localStorage.setItem("userName", firstName);

      return { token, name: firstName };
    } catch (error) {
      throw error.message || "Registration failed";
    }
  },

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();
      // For Google login, use displayName if available, otherwise extract from email
      const firstName = getFirstName(user.displayName, user.email);

      localStorage.setItem("token", token);
      localStorage.setItem("userName", firstName);

      return { token, name: firstName };
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
