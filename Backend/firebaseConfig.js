// config/firebaseConfig.js
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();
import serviceAccount from "./firebaseServiceAccount.js"; // our service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // from your .env file
});

const bucket = admin.storage().bucket();

export { bucket };
