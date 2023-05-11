import axios from "axios";

export const api = axios.create({
	baseURL: "https://connect-plus-api.onrender.com",
});
