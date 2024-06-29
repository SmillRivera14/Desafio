Para crear un archivo README.md con el contenido del OpenAPI especificado, puedes seguir este formato:

```markdown
# Gestion de productos API

## Descripción
Esta API proporciona endpoints para gestionar productos y usuarios, así como funciones de autenticación.

## Endpoints

### Autenticación

#### Registrar usuario

Registra un nuevo usuario en el sistema.

- **URL**
  ```
  POST /api/Autentication/registrar
  ```

- **Body**
  ```json
  {
    "idUsuario": "integer",
    "nombre": "string",
    "hashContraseña": "string",
    "email": "string",
    "rol": "string"
  }
  ```

- **Respuestas**
  - `200 OK` Si se registra correctamente el usuario.
  - Otros códigos de respuesta posibles en caso de errores.

#### Iniciar sesión

Inicia sesión con credenciales de usuario.

- **URL**
  ```
  POST /api/Autentication/login
  ```

- **Body**
  ```json
  {
    "nombre": "string",
    "hashContraseña": "string"
  }
  ```

- **Respuestas**
  - `200 OK` Devuelve un token JWT para autenticación.
  - Otros códigos de respuesta posibles en caso de errores.

#### Obtener usuario autenticado

Obtiene los detalles del usuario autenticado.

- **URL**
  ```
  GET /api/Autentication/user
  ```

- **Respuestas**
  - `200 OK` Si se obtienen los detalles del usuario correctamente.
  - Otros códigos de respuesta posibles en caso de errores.

### Productos

#### Obtener todos los productos

Obtiene una lista de todos los productos en el sistema.

- **URL**
  ```
  GET /api/Productos
  ```

- **Respuestas**
  - `200 OK` Devuelve una lista de objetos Producto.
  - Otros códigos de respuesta posibles en caso de errores.

#### Crear un producto

Crea un nuevo producto en el sistema.

- **URL**
  ```
  POST /api/Productos
  ```

- **Body**
  ```json
  {
    "idProducto": "integer",
    "nombre": "string",
    "descripcion": "string",
    "precio": "number",
    "stock": "integer",
    "fechaCreacion": "string",
    "fechaUltimaCreacion": "string"
  }
  ```

- **Respuestas**
  - `200 OK` Devuelve el objeto Producto creado.
  - Otros códigos de respuesta posibles en caso de errores.

#### Obtener producto por ID

Obtiene los detalles de un producto específico por su ID.

- **URL**
  ```
  GET /api/Productos/{id}
  ```

- **Parámetros de URL**
  ```
  id: integer (ID del producto)
  ```

- **Respuestas**
  - `200 OK` Devuelve el objeto Producto correspondiente al ID especificado.
  - Otros códigos de respuesta posibles en caso de errores.

#### Actualizar producto

Actualiza los detalles de un producto existente por su ID.

- **URL**
  ```
  PUT /api/Productos/{id}
  ```

- **Parámetros de URL**
  ```
  id: integer (ID del producto)
  ```

- **Body**
  ```json
  {
    "idProducto": "integer",
    "nombre": "string",
    "descripcion": "string",
    "precio": "number",
    "stock": "integer",
    "fechaCreacion": "string",
    "fechaUltimaCreacion": "string"
  }
  ```

- **Respuestas**
  - `200 OK` Si se actualiza correctamente el producto.
  - Otros códigos de respuesta posibles en caso de errores.

#### Eliminar producto

Elimina un producto existente por su ID.

- **URL**
  ```
  DELETE /api/Productos/{id}
  ```

- **Parámetros de URL**
  ```
  id: integer (ID del producto)
  ```

- **Respuestas**
  - `204 No Content` Si se elimina correctamente el producto.
  - Otros códigos de respuesta posibles en caso de errores.

### Usuarios

#### Obtener todos los usuarios

Obtiene una lista de todos los usuarios en el sistema.

- **URL**
  ```
  GET /api/Usuarios
  ```

- **Respuestas**
  - `200 OK` Devuelve una lista de objetos UsuarioDTO.
  - Otros códigos de respuesta posibles en caso de errores.

#### Obtener usuario por ID

Obtiene los detalles de un usuario específico por su ID.

- **URL**
  ```
  GET /api/Usuarios/{id}
  ```

- **Parámetros de URL**
  ```
  id: integer (ID del usuario)
  ```

- **Respuestas**
  - `200 OK` Devuelve el objeto UsuarioDTO correspondiente al ID especificado.
  - Otros códigos de respuesta posibles en caso de errores.

#### Actualizar usuario

Actualiza los detalles de un usuario existente por su ID.

- **URL**
  ```
  PATCH /api/Usuarios/{id}
  ```

- **Parámetros de URL**
  ```
  id: integer (ID del usuario)
  ```

- **Body**
  ```json
  {
    "idUsuario": "integer",
    "nombre": "string",
    "hashContraseña": "string",
    "email": "string",
    "rol": "string"
  }
  ```

- **Respuestas**
  - `204 No Content` Si se actualiza correctamente el usuario.
  - Otros códigos de respuesta posibles en caso de errores.

#### Eliminar usuario

Elimina un usuario existente por su ID.

- **URL**
  ```
  DELETE /api/Usuarios/{id}
  ```

- **Parámetros de URL**
  ```
  id: integer (ID del usuario)
  ```

- **Respuestas**
  - `204 No Content` Si se elimina correctamente el usuario.
  - Otros códigos de respuesta posibles en caso de errores.
```

Este formato estructurado y detallado ayudará a los desarrolladores y usuarios a entender rápidamente cómo interactuar con tu API. Asegúrate de ajustar los detalles según las necesidades específicas de tu proyecto.
