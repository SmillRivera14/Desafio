import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7047/api/Autentication/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include' 
        });

        if (response.ok) {
          const content = await response.json();
          setName(content.nombre);
        } else {
          const errorText = await response.text();
          setError(errorText);
        }
      } catch (err) {
        setError('An error occurred: ' + err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {name ? 'Hi ' + name : error ? 'Error: ' + error : 'Debes iniciar sesión'}
    </div>
  );
};

export default Home;
