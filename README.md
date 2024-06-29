# Documentación del Proyecto "Gestión de Productos"

Este proyecto de frontend está desarrollado en React y utiliza CSS Modules para el manejo de estilos locales. A continuación, se detallan los componentes principales y su funcionamiento dentro de la aplicación.

## Componente `AdminPages`

### Descripción
El componente `AdminPages` permite la visualización y gestión de usuarios administrativos. Proporciona una galería de usuarios donde se puede hacer clic en cada usuario para ver detalles como nombre, email y rol.

### Dependencias
- React: Biblioteca para construir interfaces de usuario.
- CSS Modules: Estilos CSS locales para modularización.

### Funcionalidades
- **Manejo de Estado**: Utiliza estados locales para almacenar los datos del usuario seleccionado y manejar errores.
- **Fetch de Datos**: Realiza una solicitud GET a `https://localhost:7047/api/Usuarios/{id}` para obtener detalles del usuario seleccionado.
- **Interfaz de Usuario**: Muestra los detalles del usuario seleccionado en una galería y permite regresar a la lista de usuarios.
- **Componente `Usuarios`**: Componente secundario para mostrar la lista de usuarios disponibles y permitir la selección de un usuario.

### Uso
El componente `AdminPages` se utiliza para administrar usuarios en una interfaz de administración, mostrando detalles y permitiendo navegación entre usuarios.

## Componente `Editar`

### Descripción
El componente `Editar` permite editar los detalles de un usuario seleccionado mediante un formulario. Realiza una solicitud PATCH a la API para actualizar los datos del usuario.

### Dependencias
- React: Biblioteca para construir interfaces de usuario.
- CSS Modules: Estilos CSS locales para modularización.

### Funcionalidades
- **Manejo de Estado**: Utiliza estados locales para almacenar y actualizar los datos del usuario.
- **Fetch de Datos**: Realiza una solicitud GET inicial a `https://localhost:7047/api/Usuarios/{id}` para cargar los datos del usuario seleccionado.
- **Envío de Solicitud**: Realiza una solicitud PATCH a `https://localhost:7047/api/Usuarios/{id}` para actualizar los datos del usuario al enviar el formulario.
- **Interfaz de Usuario**: Muestra un formulario prellenado con los datos actuales del usuario y permite su edición.

### Uso
El componente `Editar` se utiliza para modificar los detalles de un usuario existente en la aplicación.

## Componente `Home`

### Descripción
El componente `Home` muestra un mensaje de bienvenida al usuario que ha iniciado sesión, utilizando su nombre recuperado de la API.

### Dependencias
- React: Biblioteca para construir interfaces de usuario.
- CSS Modules: Estilos CSS locales para modularización.

### Funcionalidades
- **Fetch de Datos**: Realiza una solicitud GET a `https://localhost:7047/api/Autentication/user` para obtener el nombre de usuario.
- **Interfaz de Usuario**: Muestra un mensaje de bienvenida junto con el nombre de usuario o un mensaje de error si no se ha iniciado sesión.

### Uso
El componente `Home` se utiliza en la página principal de la aplicación para dar la bienvenida al usuario y mostrar su nombre si ha iniciado sesión.

## Componente `Login`

### Descripción
El componente `Login` permite a los usuarios iniciar sesión en la aplicación proporcionando su nombre y contraseña. Los datos ingresados se envían a una API REST para autenticación.

### Dependencias
- React: Biblioteca para construir interfaces de usuario.
- react-router-dom: Gestión de rutas en una aplicación React.
- CSS Modules: Estilos CSS locales para modularización.

### Funcionalidades
- **Manejo de Estado**: Utiliza estados locales para almacenar los datos del formulario (`nombre`, `HashContraseña`).
- **Envío de Solicitud**: Envía una solicitud POST a `https://localhost:7047/api/Autentication/login` con los datos del formulario al presionar el botón "Iniciar sesión".
- **Redirección**: Navega a la página de productos (`/products`) si el inicio de sesión es exitoso.
- **Gestión de Errores**: Muestra alertas en caso de errores durante el inicio de sesión, ya sea por errores en la validación de datos o problemas de conexión.

### Uso
El componente `Login` se utiliza para permitir a los usuarios iniciar sesión en la aplicación ingresando su nombre y contraseña.

## Componente `Products`

### Descripción
El componente `Products` muestra una galería de productos obtenidos de una API REST. Muestra detalles como nombre, descripción, precio, stock y fechas de creación y última actualización de cada producto.

### Dependencias
- React: Biblioteca para construir interfaces de usuario.
- CSS Modules: Estilos CSS locales para modularización.

### Funcionalidades
- **Fetch de Datos**: Realiza una solicitud GET a `https://localhost:7047/api/Productos` para obtener la lista de productos.
- **Interfaz de Usuario**: Muestra una galería con detalles de cada producto o un mensaje de que no hay productos disponibles si la lista está vacía.

### Uso
El componente `Products` se utiliza para mostrar una galería de productos disponibles en la aplicación.

## Componente `Register`

### Descripción
El componente `Register` permite a los usuarios registrarse en la aplicación proporcionando su nombre, rol, dirección de correo electrónico y contraseña. Los datos ingresados se envían a una API REST para procesar el registro.

### Dependencias
- React: Biblioteca para construir interfaces de usuario.
- react-router-dom: Gestión de rutas en una aplicación React.
- CSS Modules: Estilos CSS locales para modularización.

### Funcionalidades
- **Manejo de Estado**: Utiliza estados locales para almacenar los datos del formulario (`nombre`, `email`, `rol`, `hashContraseña`).
- **Envío de Solicitud**: Envía una solicitud POST a `https://localhost:7047/api/Autentication/registrar` con los datos del formulario al presionar el botón "Submit".
- **Redirección**: Navega a la página de inicio de sesión (`/login`) si el registro es exitoso.
- **Gestión de Errores**: Muestra alertas en caso de errores durante el registro, ya sea por errores en la validación de datos o problemas de conexión.

### Uso
El componente `Register` se utiliza para permitir a los usuarios registrarse en la aplicación ingresando sus datos básicos y creando una cuenta a través de una API REST.

---