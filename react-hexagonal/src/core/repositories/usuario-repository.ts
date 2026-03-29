import type { Usuario } from "../entities/usuario";

export interface UsuarioRepository {
  getAll(): Promise<Usuario[]>;
  getRoles(): Promise<Usuario[]>;

  getById(id: string): Promise<Usuario>;
  create(user: Omit<Usuario, 'id'>): Promise<Usuario>;
  update(id: string, user: Partial<Usuario>): Promise<Usuario>;
  delete(id: string): Promise<void>;
  getDetails(id: string): Promise<Usuario>;

}