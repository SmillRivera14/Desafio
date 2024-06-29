import React, { useState, useEffect } from "react";
import styles from "../Home.module.css"; // Importar estilos de CSS Modules

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
    <div className={styles.homeContainer}>
      <div className={styles.neonText}>
        <span className={styles.neonSpan}>Bienvenido</span>
      </div >
       <span className={styles.username}>{name ? <div> {name}</div> : error ? <div>Error: {error}</div> : <div>Debes iniciar sesión</div>}</span>
    </div>
  );
};

export default Home;
