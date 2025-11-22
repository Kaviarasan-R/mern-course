const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users/register`,

  // Posts
  POSTS: `${API_BASE_URL}/posts`,
  POST_BY_ID: (id: string) => `${API_BASE_URL}/posts/${id}`,
  CREATE_POST: `${API_BASE_URL}/posts`,
  UPDATE_POST: (id: string) => `${API_BASE_URL}/posts/${id}`,
  DELETE_POST: (id: string) => `${API_BASE_URL}/posts/${id}`,

  // Users
  USERS: `${API_BASE_URL}/users`,
  USER_BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
};

export default API_ENDPOINTS;
