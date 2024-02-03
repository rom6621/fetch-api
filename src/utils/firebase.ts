import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} satisfies FirebaseOptions;
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
const devAuth = getAuth(app);
devAuth.tenantId = process.env.NEXT_PUBLIC_FIREBASE_DEV_TENANT;
const prodAuth = getAuth(app);
prodAuth.tenantId = process.env.NEXT_PUBLIC_FIREBASE_PROD_TENANT;
export { devAuth, prodAuth };
