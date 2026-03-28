// src/core/use-cases/UserUseCases.ts
import type { UserRepository } from "../repositories/UserRepository";

export const GestionUsuariosUseCases = (repository: UserRepository) => ({
  getAll: () => repository.getAll(),
  create: (user: any) => repository.create(user),
  delete: (id: string) => repository.delete(id),
  getById: (id: string) => repository.getById(id),

});
