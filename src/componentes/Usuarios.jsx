import Snuffles from '../assets/Snuffles.png';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from '../AdminPages.module.css'; // Importa los estilos CSS modules

const Usuarios = ({ handleCardClick }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  // Función para cargar los usuarios desde la API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("https://localhost:7047/api/Usuarios", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error al cargar los usuarios.");
        }
      } catch (err) {
        setError("Error al conectar con la API");
      }
    };

    fetchUsuarios();
  }, []);

  // Función para eliminar un usuario
  const handleEliminarUsuario = async (idUsuario) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://localhost:7047/api/Usuarios/${idUsuario}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (response.ok) {
          // Actualiza la lista de usuarios después de eliminar
          const updatedUsuarios = usuarios.filter(
            (usuario) => usuario.idUsuario !== idUsuario
          );
          alert("¡Usuario eliminado con éxito!");
          setTimeout(() => {
            setDeleteSuccessMessage("");
          }, 3000); // Oculta el mensaje después de 3 segundos
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error al eliminar el usuario.");
        }
      } catch (err) {
        setError("An error occurred: " + err.message);
      }
    }
  };

  return (
    <section className={styles.galleryGrid}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {deleteSuccessMessage && (
        <div className={styles.successMessage}>{deleteSuccessMessage}</div>
      )}
      {usuarios.length > 0 ? (
        usuarios.map((usuario) => (
          <div key={usuario.idUsuario} className={styles.galleryView} onClick={() => handleCardClick(usuario.idUsuario)}>
            <div className={styles.productImage}>
              <img className={styles.thumbnail} src={Snuffles} alt={usuario.nombre} />
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.productName}>Nombre: {usuario.nombre}</h2>
              <p className={styles.productDescription}>Email: {usuario.email}</p>
              <p className={styles.productPrice}>Rol: {usuario.rol}</p>
              <div className={styles.actions}>
                <Link to={`/editar/${usuario.idUsuario}`}>
                  Editar
                </Link>{" "}
                |{" "}
                <button onClick={() => handleEliminarUsuario(usuario.idUsuario)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No hay usuarios disponibles</div>
      )}
    </section>
  );
};

export default Usuarios;
