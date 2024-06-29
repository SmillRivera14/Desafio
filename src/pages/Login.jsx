// Login.jsx
import React, { useState } from "react";
import styles from "../Login.module.css"; // Importar estilos de CSS Modules
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    HashContraseña: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7047/api/Autentication/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Login successful');
        navigate('/products'); 
      } else {
        const errorData = await response.json();
        console.error('Error al iniciar sesión:', errorData);
        alert(`Error al iniciar sesión: ${errorData.errors ? Object.values(errorData.errors).flat().join(', ') : response.statusText}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.formSignin} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>Inicia sesión</h1>
        <input
          type="text"
          name="nombre"
          className={styles.formControl}
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        <input
          type="password"
          name="HashContraseña"
          className={styles.formControl}
          placeholder="Contraseña"
          value={formData.HashContraseña}
          onChange={handleChange}
        />

        <button className={styles.submitButton} type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
