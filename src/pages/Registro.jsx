import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault(); 
    const response = await fetch('https://localhost:7047/api/Autentication/registrar', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        nombre: name,
        email: email,
        rol: rol,
        hashContraseña: password
      })
    });

    const content = await response.json();
    console.log(content);
  }

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Registrarse</h1>
      <input
        className="form-control"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        className="form-control"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control"
        placeholder="Rol"
        value={rol}
        onChange={(e) => setRol(e.target.value)}
      />

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  );
};

export default Register;
