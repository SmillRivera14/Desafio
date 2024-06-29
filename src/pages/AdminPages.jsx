import React, { useState } from 'react';
import styles from "../AdminPages.module.css"; // Importación de estilos CSS Modules adaptados
import Snuffles from '../assets/Snuffles.png';
import Usuarios from '../componentes/Usuarios';

const AdminPages = () => {
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [error, setError] = useState('');

  const handleCardClick = async (id) => {
    try {
      const response = await fetch(`https://localhost:7047/api/Usuarios/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedUsuario(data);
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    }
  };

  return (
    <section>
      {error && <div>{error}</div>}
      
      {selectedUsuario ? (
        <div className={styles.galleryView} key={selectedUsuario.idUsuario}>
          <div>
            <img className={styles.thumbnail} src={Snuffles} alt={selectedUsuario.nombre} />
          </div>
          <div className={styles.cardBody}>
            <h2 className={styles.productName}>Nombre: {selectedUsuario.nombre}</h2>
            <p>Email: {selectedUsuario.email}</p>
            <p>Rol: {selectedUsuario.rol}</p>
          </div>
          <button className={styles.backButton} onClick={() => setSelectedUsuario(null)}>
            Back
          </button>
        </div>
      ) : (
        <Usuarios handleCardClick={handleCardClick} />
      )}
    </section>
  );
};

export default AdminPages;
