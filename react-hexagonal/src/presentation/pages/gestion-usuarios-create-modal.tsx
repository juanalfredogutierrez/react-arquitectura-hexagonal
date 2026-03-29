import { useState } from "react";
import styles from "./gestion-usuarios.module.css";

interface Props {
  onSave: (usuario: any) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export const GestionUsuarioForm = ({ onSave, onCancel, isSaving }: Props) => {
  // Estado inicial basado en la estructura de tu objeto
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "" },
    address: { street: "", city: "" }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.modalContent} onSubmit={handleSubmit}>
        <h2>Crear Nuevo Usuario</h2>
        
        <div className={styles.detailGrid}>
          {/* Información Básica */}
          <div className={styles.detailItem}>
            <label className={styles.label}>Nombre Completo</label>
            <input 
              className={styles.inputField}
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className={styles.detailItem}>
            <label className={styles.label}>Email</label>
            <input 
              type="email"
              className={styles.inputField}
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Empresa (Objeto anidado) */}
          <div className={styles.detailItem}>
            <label className={styles.label}>Empresa</label>
            <input 
              className={styles.inputField}
              placeholder="Nombre de la empresa"
              value={formData.company.name}
              onChange={e => setFormData({
                ...formData, 
                company: { ...formData.company, name: e.target.value }
              })}
            />
          </div>

          {/* Ciudad */}
          <div className={styles.detailItem}>
            <label className={styles.label}>Ciudad</label>
            <input 
              className={styles.inputField}
              value={formData.address.city}
              onChange={e => setFormData({
                ...formData, 
                address: { ...formData.address, city: e.target.value }
              })}
            />
          </div>
        </div>

        <div className={styles.actions} style={{marginTop: '20px'}}>
          <button type="submit" className={styles.createButton} disabled={isSaving}>
            {isSaving ? "Guardando..." : "Guardar Usuario"}
          </button>
          <button type="button" className={styles.closeButton} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
