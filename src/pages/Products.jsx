import React, { useState, useEffect } from 'react';
import styles from '../Products.module.css'; // Importa estilos usando CSS Modules
import Snuffles from '../assets/Snuffles.png';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7047/api/Productos');

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          const errorText = await response.text();
          setError(errorText);
        }
      } catch (err) {
        setError('An error occurred: ' + err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className={styles.galleryGrid}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {products.length > 0 ? (
        products.map(producto => (
          <div key={producto.idProducto} className={styles.galleryView}>
            <div className={styles.productImage}>
              <img className={styles.thumbnail} src={Snuffles} alt={producto.nombre} />
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.productName}>{producto.nombre}</h2>
              <p className={styles.productDescription}>{producto.descripcion}</p>
              <p className={styles.productPrice}>Precio: ${producto.precio.toFixed(2)}</p>
              <p className={styles.productStock}>Stock: {producto.stock}</p>
              <p className={styles.productCreatedAt}>Fecha de Creación: {new Date(producto.fechaCreacion).toLocaleDateString()}</p>
              <p className={styles.productLastUpdated}>Última Actualización: {new Date(producto.fechaUltimaActualizacion).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No hay productos disponibles</div>
      )}
    </section>
  );
};

export default Products;
