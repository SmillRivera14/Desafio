import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../Login.module.css'; // Importar los estilos CSS Modules

const Editar = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nombre: '',
    hashContraseña: '',
    email: '',
    rol: ''
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`https://localhost:7047/api/Usuarios/${id}`, {
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setUsuario(data);
          } else {
            console.error('Data from API is undefined');
          }
        } else {
          console.error('Response not OK:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching usuario:', error);
      }
    };
  
    fetchUsuario();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7047/api/Usuarios/${id}`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        console.log(await response.json());
        console.log('Usuario actualizado correctamente');
        // Aquí podrías redirigir o mostrar un mensaje de éxito
      } else {
        console.error('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error en la conexión', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.formSignin} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Editar Usuario</h2>
        <div className={styles.formGroup}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre || ''}
            onChange={handleChange}
            className={styles.formControl}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hashContraseña">Contraseña:</label>
          <input
            type="password"
            id="hashContraseña"
            name="hashContraseña"
            value={usuario.hashContraseña || ''}
            onChange={handleChange}
            className={styles.formControl}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={usuario.email || ''}
            onChange={handleChange}
            className={styles.formControl}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rol">Rol:</label>
          <input
            type="text"
            id="rol"
            name="rol"
            value={usuario.rol || ''}
            onChange={handleChange}
            className={styles.formControl}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.submitButton}>Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
};

export default Editar;
