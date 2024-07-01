import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Login.module.css"; // Importa estilos usando CSS Modules

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "",
    hashContraseña: ""
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
      const response = await fetch('https://localhost:7047/api/Autentication/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const content = await response.json();
        console.log(content);
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Error al registrar:', errorData);
        alert(`${errorData.errors ? Object.values(errorData.errors).flat().join(', ') : errorData.message}`);
      }
    } catch (error) {
      alert('No se pudo conectar a la API');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.formSignin} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>Registrarse</h1>
        <input
          type="text"
          name="nombre"
          className={styles.formControl}
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        <input
          type="text"
          name="rol"
          className={styles.formControl}
          placeholder="Rol"
          value={formData.rol}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          className={styles.formControl}
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="hashContraseña"
          className={styles.formControl}
          placeholder="Password"
          value={formData.hashContraseña}
          onChange={handleChange}
        />

        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
