---

# Gestión de Productos

Este proyecto es una aplicación completa que consta de un frontend desarrollado en React y una API desarrollada en ASP.NET Core. La aplicación permite la gestión de productos y usuarios mediante una API RESTful, utilizando Entity Framework Core para la persistencia de datos y JWT para la autenticación de usuarios.

## Repositorios

- **Frontend**: [Fronted](https://github.com/SmillRivera14/Desafio/tree/Frontend)
- **API**: [master](https://github.com/SmillRivera14/Desafio/tree/master)

## Pasos para usar la aplicación

1. **Iniciar el motor de bases de datos SQL Server**

   - Asegúrate de tener SQL Server instalado y en ejecución.
   - Ingresar los datos de prueba de productos en la base de datos.

2. **Iniciar la API**

   - Clona el repositorio de la API:
     ```bash
     git clone https://github.com/SmillRivera14/master.git
     cd master
     ```
   - Configura la cadena de conexión en `appsettings.json` bajo `ConnectionStrings` para que apunte a tu instancia de SQL Server:
     ```json
     {
       "ConnectionStrings": {
         "AppConnection": "data source=[EL NOMBRE DE TU SERVIDOR];initial catalog=Prubeas;Integrated Security=true;Encrypt=false;TrustServerCertificate=true;MultipleActiveResultSets=true"

       }
     }
     ```
   - Compila y ejecuta la aplicación:
     ```bash
     dotnet build
     dotnet run
     ```
   - La API estará disponible en `https://localhost:7047`.

3. **Iniciar el frontend**

   - Clona el repositorio del frontend:
     ```bash
     git clone https://github.com/SmillRivera14/Fronted.git
     cd Fronted/vite-project
     ```
   - Instala las dependencias y ejecuta la aplicación:
     ```bash
     npm install
     npm run dev
     ```
   - La aplicación web estará disponible en `http://localhost:5173`.

4. **Crear un usuario administrador**

   - Registra un nuevo usuario en la aplicación.
   - Asigna el rol de administrador al usuario creado para tener acceso a todas las funcionalidades.
   - Si no aparece el apartado de administrador después de iniciar sesión, recarga la página.

## Uso de la Aplicación

### Usuarios y Autenticación

- **Registrar un nuevo usuario**:
  ```http
  POST /api/autentication/registrar
  ```
  Crea un nuevo usuario en la base de datos.

- **Iniciar sesión**:
  ```http
  POST /api/autentication/login
  ```
  Inicia sesión y genera un token JWT que se almacena en las cookies.

- **Obtener información del usuario**:
  ```http
  GET /api/autentication/user
  ```
  Devuelve la información del usuario autenticado utilizando el token JWT almacenado en las cookies.

### Gestión de Productos

- **Obtener todos los productos**:
  ```http
  GET /api/productos
  ```

- **Obtener un producto por ID**:
  ```http
  GET /api/productos/{id}
  ```

- **Crear un nuevo producto**:
  ```http
  POST /api/productos
  ```

- **Actualizar un producto existente**:
  ```http
  PUT /api/productos/{id}
  ```

- **Eliminar un producto**:
  ```http
  DELETE /api/productos/{id}
  ```

### Gestión de Usuarios (requiere permisos de administrador)

- **Obtener todos los usuarios**:
  ```http
  GET /api/usuarios
  ```

- **Obtener un usuario por ID**:
  ```http
  GET /api/usuarios/{id}
  ```

- **Actualizar un usuario existente**:
  ```http
  PATCH /api/usuarios/{id}
  ```

- **Eliminar un usuario**:
  ```http
  DELETE /api/usuarios/{id}
  ```

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama con tu funcionalidad: `git checkout -b feature/NuevaFuncionalidad`.
3. Commit tus cambios: `git commit -am 'Añade nueva funcionalidad'`.
4. Push a la rama: `git push origin feature/NuevaFuncionalidad`.
5. Envía un pull request.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

---
