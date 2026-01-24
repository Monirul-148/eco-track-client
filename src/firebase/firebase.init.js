import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRISmB94SMeF_dk9VC8C-wGnjCjSFC_tc",
  authDomain: "email-password-auth-f5490.firebaseapp.com",
  projectId: "email-password-auth-f5490",
  storageBucket: "email-password-auth-f5490.firebasestorage.app",
  messagingSenderId: "1013149541431",
  appId: "1:1013149541431:web:46fe950190acd36c540bb2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { app };
