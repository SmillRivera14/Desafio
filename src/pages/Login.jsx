import React, { useState } from "react";
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
        navigate('/'); 
      } else {
        console.error('Error al iniciar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejo de errores, como mostrar un mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 fw-normal">Inicia sesión</h1>
      <input
        type="text"
        name="nombre"
        className="form-control"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />

      <input
        type="password"
        name="HashContraseña"
        className="form-control"
        placeholder="Contraseña"
        value={formData.HashContraseña}
        onChange={handleChange}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
