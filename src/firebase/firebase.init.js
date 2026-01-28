// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDRISmB94SMeF_dk9VC8C-wGnjCjSFC_tc",
//   authDomain: "email-password-auth-f5490.firebaseapp.com",
//   projectId: "email-password-auth-f5490",
//   storageBucket: "email-password-auth-f5490.firebasestorage.app",
//   messagingSenderId: "1013149541431",
//   appId: "1:1013149541431:web:46fe950190acd36c540bb2"
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
// export { app };


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCGxQBPklpx0z42_GvRQk0t30wdvV8LsCU",
//   authDomain: "ecotrack-auth-4ca68.firebaseapp.com",
//   projectId: "ecotrack-auth-4ca68",
//   storageBucket: "ecotrack-auth-4ca68.firebasestorage.app",
//   messagingSenderId: "795926119452",
//   appId: "1:795926119452:web:e31f48bed8333574424bd9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
// export { app };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ✅ Debug (temporary)
console.log("FIREBASE API KEY =", import.meta.env.VITE_FIREBASE_API_KEY);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
