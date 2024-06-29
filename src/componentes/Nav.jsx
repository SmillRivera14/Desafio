// Nav.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css"; // Importar estilos de CSS Modules

const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link className={styles.navbarBrand} to=".">Home</Link>

        <div className={styles.navCollapse}>
          <ul className={styles.navbarNav}>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/login">Login</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/register">Registro</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/products">Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
