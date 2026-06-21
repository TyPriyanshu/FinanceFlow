import apiClient from '../api/client';

export const api = {
  auth: {
    login: async (credentials: any) => {
      const response = await apiClient.post('/api/auth/login', credentials);
      return response.data;
    },
    register: async (data: any) => {
      const response = await apiClient.post('/api/auth/register', data);
      return response.data;
    },
    getUsers: async () => {
      const response = await apiClient.get('/api/auth/users');
      return response.data;
    },
  },

  records: {
    getAll: async (params: URLSearchParams) => {
      const response = await apiClient.get(`/api/records?${params.toString()}`);
      return response.data;
    },
    create: async (data: any) => {
      const response = await apiClient.post('/api/records', data);
      return response.data;
    },
    update: async (id: string, data: any) => {
      const response = await apiClient.put(`/api/records/${id}`, data);
      return response.data;
    },
    delete: async (id: string) => {
      const response = await apiClient.delete(`/api/records/${id}`);
      return response.data;
    },
    getStats: async () => {
      const response = await apiClient.get('/api/records/stats');
      return response.data;
    },
  }
};
