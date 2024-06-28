import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        // Aquí puedes manejar la respuesta según tus necesidades

        // Navegación después del registro exitoso
        navigate('/login');
      } else {
        console.error('Error al registrar:', response.statusText);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      // Manejo de errores, como mostrar un mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 fw-normal">Registrarse</h1>
      <input
        type="text"
        name="nombre"
        className="form-control"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        className="form-control"
        placeholder="name@example.com"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="rol"
        className="form-control"
        placeholder="Rol"
        value={formData.rol}
        onChange={handleChange}
      />

      <input
        type="password"
        name="hashContraseña"
        className="form-control"
        placeholder="Password"
        value={formData.hashContraseña}
        onChange={handleChange}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  );
};

export default Register;
