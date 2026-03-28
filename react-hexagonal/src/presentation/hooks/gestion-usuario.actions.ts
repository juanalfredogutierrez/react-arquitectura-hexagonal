// src/presentation/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiUserRepository } from '../../infrastructure/api/ApiUserRepository';
import { GestionUsuariosUseCases } from '../../core/use-cases/GestionUsuariosUseCase';
import type { User } from '../../core/entities/User';



export const gestionUsuarioHooks = () => {
  const queryClient = useQueryClient();
  const actions = GestionUsuariosUseCases(ApiUserRepository);

  // GET
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: actions.getAll,
  });

  

  // POST
  const createMutation = useMutation({
    mutationFn: actions.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: actions.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  // ✅ IMPORTANTE: Verifica que este return tenga todos estos nombres
  return {
    users: usersQuery.data ?? [] as User[],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    createUser: createMutation.mutate,
    isCreating: createMutation.isPending, // En TanStack v5 es 'isPending', no 'isLoading'
    deleteUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};
