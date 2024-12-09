import axios from 'axios';

const API = axios.create({
    baseURL: "http://127.0.0.1:8000", // FastAPI backend
});

export const fetchTasks = () => API.get("/tasks/");
export const createTask = (task) => API.post("/tasks/", task);
export const updateTask = (id, updates) => API.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
