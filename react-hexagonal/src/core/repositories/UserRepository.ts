import type { User } from "../entities/User";

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}