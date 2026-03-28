import { gestionUsuarioHooks } from "../hooks/gestion-usuario.actions";
import styles from "./gestion-usuarios.module.css"; // 👈 Importación del CSS Module

export const GestionUsuariosPage = () => {
  const {
    users,
    isLoading,
    isError,
    createUser,
    isCreating,
    deleteUser,
    isDeleting,
  } = gestionUsuarioHooks();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>⏳ Cargando usuarios...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <p className={styles.errorText}>❌ Error al obtener la información.</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Arquitectura Hexagonal</h1>
        <p>Consumiendo API de forma desacoplada</p>
      </header>

      <section className={styles.formSection}>
        <button
          className={styles.createButton}
          disabled={isCreating}
          onClick={() => createUser({
            name: 'Nuevo Usuario Profesional',
            email: 'dev@arquitectura.com'
          })}
        >
          {isCreating ? 'Guardando...' : '➕ Agregar Usuario'}
        </button>
      </section>

      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id} className={styles.listItem}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>

            <div className={styles.actions}> {/* Contenedor para botones */}
              <button
                className={styles.deleteButton}
                disabled={isDeleting}
                onClick={() => {
                  if (confirm(`¿Eliminar a ${user.name}?`)) deleteUser(user.id);
                }}
              >
                {isDeleting ? '...' : 'Eliminar'}
              </button>

              <button
                className={styles.detailsButton}
              >
                Ver Detalles
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
