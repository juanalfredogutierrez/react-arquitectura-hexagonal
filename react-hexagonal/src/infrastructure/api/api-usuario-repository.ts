import axios from 'axios';
import type { UsuarioRepository } from '../../core/repositories/usuario-repository';
import type { Usuario } from '../../core/entities/usuario';

const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/' });

export const ApiUsuarioRepository: UsuarioRepository = {
  getAll: async () => {
    const res = await api.get<Usuario[]>('/users');
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get<Usuario>(`/users/${id}`);
    return res.data;
  },

  getDetails: async (id: string) => {
      console.log('consulta detalles:', id); // Log para verificar la respuesta
    const res = await api.get<Usuario>(`/users/${id}`);
    console.log('respuesta detalles:', res.data); // Log para verificar la respuesta

    return res.data;
  },

  create: async (user: Omit<Usuario, 'id'>) => {
    const res = await api.post<Usuario>('/users', user);
    console.log('Usuario creado en la API:', res.data); // Log para verificar la respuesta
    return res.data;
  },

  update: async (id: string, user: Partial<Usuario>) => {
    const res = await api.put<Usuario>(`/users/${id}`, user);
    return res.data;
  },

  delete: async (id: string) => {
    console.log('Usuario eliminado de la API:', id); // Log para verificar la respuesta
    await api.delete(`/users/${id}`);
  },


};
