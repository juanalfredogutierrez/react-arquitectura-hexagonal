// src/core/use-cases/UsuarioUseCases.ts
import type { UsuarioRepository } from "../repositories/usuario-repository";

export const GestionUsuariosUseCases = (repository: UsuarioRepository) => ({  
  getAll: () => repository.getAll(),
  create: (user: any) => repository.create(user),
  delete: (id: string) => repository.delete(id),
  getById: (id: string) => repository.getById(id),
  getDetails: (id: string) => repository.getDetails(id),
});