import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../Login.module.css'; // Importar los estilos CSS Modules
import { useNavigate } from 'react-router-dom';
const Editar = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nombre: '',
    hashContraseña: '',
    email: '',
    rol: ''
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
          setError(`Error al obtener usuario: ${response.statusText}`);
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
        alert('Usuario actualizado correctamente')
        navigate('/adminpages');
      } else {
        let errorData;
        try {
          const text = await response.text();
          errorData = JSON.parse(text);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          errorData = { message: await response.text() };
        }
        console.error('Error al actualizar usuario:', errorData);
        alert(`Error al actualizar usuario: ${errorData.errors ? Object.values(errorData.errors).flat().join(', ') : errorData.message}`);
      }
    } catch (error) {
      console.error('Error en la conexión', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.formSignin} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Editar Usuario</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
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
