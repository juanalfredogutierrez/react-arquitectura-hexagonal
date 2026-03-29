// src/presentation/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GestionUsuariosUseCases } from '../../core/use-cases/gestion-usuarios-UseCase';
import type { Usuario } from '../../core/entities/usuario';
import { ApiUsuarioRepository } from '../../infrastructure/api/api-usuario-repository';

// Instanciamos las acciones fuera para no recrearlas en cada render
const actions = GestionUsuariosUseCases(ApiUsuarioRepository);

export const gestionUsuarioHooks = (selectedUserId: string | null = null) => {
  const queryClient = useQueryClient();

  // 1. GET LISTA
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: actions.getAll,
  });

  // 2. GET DETALLES (Se activa solo si hay un ID)
  const detailsQuery = useQuery({
    queryKey: ['users', selectedUserId],
    queryFn: () => actions.getDetails(selectedUserId!),
    enabled: !!selectedUserId,
  });

  // 3. MUTACIONES
  const createMutation = useMutation({
    mutationFn: actions.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: actions.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  return {
    // Datos
    users: usersQuery.data ?? [] as Usuario[],
    userDetail: detailsQuery.data, // Detalles del usuario seleccionado
    
    // Estados de carga
    isLoading: usersQuery.isLoading,
    isDetailsLoading: detailsQuery.isLoading,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    
    // Acciones
    createUser: createMutation.mutate,
    deleteUser: deleteMutation.mutate,
    
    // Errores
    isError: usersQuery.isError || detailsQuery.isError,
  };
};
