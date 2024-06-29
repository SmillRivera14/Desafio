import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  const [userRole, setUserRole] = useState(""); // Inicializa userRole con un valor por defecto

  useEffect(() => {
    // Lógica para obtener el rol del usuario desde la API
    fetch("https://localhost:7047/api/Autentication/user", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUserRole(data.rol); // Asigna el rol del usuario obtenido
      })
      .catch(error => {
        console.error("Error al obtener el rol del usuario:", error);
      });
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link className={styles.navbarBrand} to="/">Home</Link> {/* Cambiado a to="/" para la ruta raíz */}

        <div className={styles.navCollapse}>
          <ul className={styles.navbarNav}>
              <>
                <li className={styles.navItem}>
                  <Link className={styles.navLink} to="/login">Login</Link>
                </li>
                <li className={styles.navItem}>
                  <Link className={styles.navLink} to="/register">Registro</Link>
                </li>
                <li className={styles.navItem}>
                  <Link className={styles.navLink} to="/products">Products</Link>
                </li>
              </>
            {userRole && userRole.toLowerCase() === "admin" && (
              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/adminpages">Admin</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
