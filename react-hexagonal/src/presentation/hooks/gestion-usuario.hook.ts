import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GestionUsuariosUseCases } from "../../core/use-cases/gestion-usuarios-UseCase";
import { ApiUsuarioRepository } from "../../infrastructure/api/api-usuario-repository";
import type { Usuario } from "../../core/entities/usuario";

export const gestionUsuarioHooks = (userId: string | null = null) => {
  const queryClient = useQueryClient();
  const actions = GestionUsuariosUseCases(ApiUsuarioRepository);

  // Query de la Lista
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: actions.getAll,
  });

  // Query del Detalle (se activa solo si pasas un ID)
  const detailsQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: () => actions.getDetails(userId!),
    enabled: !!userId, // No se ejecuta si el ID es null
  });

  // Mutaciones
  const createMutation = useMutation({
    mutationFn: actions.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: actions.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

    return useQuery({
    queryKey: ['roles'],
    queryFn: actions.getRoles, // La función que hace: api.get('/roles')
    staleTime: Infinity, // Los roles no suelen cambiar, los dejamos en caché permanente
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
