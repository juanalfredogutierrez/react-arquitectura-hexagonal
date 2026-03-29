import type { Usuario } from "../../core/entities/usuario";
import styles from "./gestion-usuarios.module.css";

interface Props {
  user: Usuario | null | undefined;
  isLoading: boolean;
  onClose: () => void;
}

export const GestionUsuarioModal = ({ user, isLoading, onClose }: Props) => {

  if (isLoading) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent}><p>⏳ Cargando...</p></div>
      </div>
    );
  }

  
  if (!user) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{user.name}</h2>

        <div className={styles.detailGrid}>

          <div className={styles.detailItem}>
            <span className={styles.label}>Contacto</span>
            <span className={styles.value}>📧 {user.email}</span>
            <span className={styles.value}>📞 {user.phone}</span>
          </div>


         <div className={styles.detailItem}>
            <span className={styles.label}>Ubicación</span>
            <span className={styles.value}>{user.address.street}, {user.address.city}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Compañía</span>
            <span className={styles.value}>🏢 {user.company.name}</span>
          </div>
          <span className={styles.value} style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>
            "{user.company.catchPhrase}"
          </span>
        </div>

        <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};
