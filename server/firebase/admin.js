// server/firebase/admin.js
import admin from "firebase-admin";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ruta al archivo de credenciales descargado desde Firebase Console
const serviceAccountPath = path.join(
  __dirname,
  "..",
  process.env.GOOGLE_CREDENTIALS_PATH
);
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
