import axios from 'axios';
import type { UserRepository } from '../../core/repositories/UserRepository';
import type { User } from '../../core/entities/User';



const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/' });

export const ApiUserRepository: UserRepository = {
  getAll: async () => {
    const res = await api.get<User[]>('/users');
    return res.data;
  },
  
  getById: async (id: string) => {
    const res = await api.get<User>(`/users/${id}`);
    return res.data;
  },

  create: async (user: Omit<User, 'id'>) => {
    const res = await api.post<User>('/users', user);
    console.log('Usuario creado en la API:', res.data); // Log para verificar la respuesta
    return res.data;
  },

  update: async (id: string, user: Partial<User>) => {
    const res = await api.put<User>(`/users/${id}`, user);
    return res.data;
  },

  delete: async (id: string) => {
    await api.delete(`/users/${id}`);
  }
};
