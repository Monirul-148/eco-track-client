import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.init"; 

export const API = axios.create({
   baseURL: "https://eco-track-server-dusky.vercel.app/api",
});


const getCurrentUser = (authInstance) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};


API.interceptors.request.use(
  async (config) => {
    const authInstance = getAuth();
    let user = authInstance.currentUser;

    if (!user) {
      user = await getCurrentUser(authInstance);
    }

    if (user) {
      try {
        const token = await user.getIdToken(true);
        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.error(" Token fetch failed:", err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("⚠️ Auth Error: Invalid token or unauthorized.");
    }
    return Promise.reject(error);
  }
);

export default API;