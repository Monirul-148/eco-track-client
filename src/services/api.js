import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({ baseURL: API_BASE_URL });
export const getChallenges = () => api.get("/api/challenges");
export const getChallenge = id => api.get(`/api/challenges/${id}`);
export const addChallenge = data => api.post("/api/challenges", data);
export const joinChallenge = id => api.post(`/api/challenges/join/${id}`);
export const getTips = () => api.get("/api/tips");
export const getEvents = () => api.get("/api/events");
