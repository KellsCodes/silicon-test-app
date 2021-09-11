import axios from 'axios';

const API = axios.create({baseURL: "https://jsonplaceholder.typicode.com"});
// fetchng all the posts
export const getAllPost = () => API.get("/posts");
export const getSinglePost = (id) => API.get("/posts/"+id)
export const createPost = (formData) => API.post("/posts", formData);
