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
        console.log('Login successful');
        navigate('/'); 
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
