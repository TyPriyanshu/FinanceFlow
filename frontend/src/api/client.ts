import axios from 'axios';

// Get API base URL from environment or fallback to current origin
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to format errors
apiClient.interceptors.response.use(
  (response) => {
    // Clear any previous database errors on successful response
    window.dispatchEvent(new CustomEvent('db-success'));
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    if (
      error.response?.status === 503 ||
      error.response?.data?.errorType === 'DATABASE_DISCONNECTED'
    ) {
      window.dispatchEvent(new CustomEvent('db-error', { detail: message }));
    }
    return Promise.reject(new Error(message));
  }
);
export default apiClient;
