# Gestion de productos

Este proyecto es una aplicación ASP.NET Core que gestiona productos y usuarios mediante una API RESTful. Utiliza Entity Framework Core para la persistencia de datos y JWT para la autenticación de usuarios.

## Configuración

### Requisitos previos

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [SQL Server](https://www.microsoft.com/sql-server)

### Instalación

1. Clonar el repositorio:

   bash
   git clone https://github.com/tu-usuario/gestion-de-productos.git
   cd gestion-de-productos
   

2. Configurar la base de datos:

   - Asegúrate de tener SQL Server instalado y configurado.
   - Actualiza la cadena de conexión enappsettings.json` bajoConnectionStrings` para que apunte a tu instancia de SQL Server:

   `json
     {
       "ConnectionStrings": {
         "AppConnection": "Server=localhost;Database=TuBaseDeDatos;Trusted_Connection=True;"
       }
     }
   `

3. Compilar y ejecutar la aplicación:

   Desde la carpeta raíz del proyecto:

 `bash
   dotnet build
   dotnet run
 `

   Esto compilará y ejecutará la aplicación enhttps://localhost:5001` (por defecto).

4. Configurar CORS

   - La configuración de CORS está habilitada para permitir acceso desde diferentes orígenes. Puedes ajustar esta configuración enStartup.cs` según tus necesidades.

5. Documentación de la API

   - La documentación de la API está disponible utilizando Swagger:
     - Navega ahttps://localhost:5001/swagger` para ver la documentación interactiva de la API.

## Uso

### Usuarios y Autenticación

- Registrar un nuevo usuario:

`
  POST /api/autentication/registrar
`
  
  Crea un nuevo usuario en la base de datos.

- Iniciar sesión:

`
  POST /api/autentication/login
`
  
  Inicia sesión y genera un token JWT que se almacena en las cookies.

- Obtener información del usuario:

`
  GET /api/autentication/user
`
  
  Devuelve la información del usuario autenticado utilizando el token JWT almacenado en las cookies.

### Productos

- Obtener todos los productos:

`
  GET /api/productos
`

- Obtener un producto por ID:

`
  GET /api/productos/{id}
`

- Crear un nuevo producto:

`
  POST /api/productos
`

- Actualizar un producto existente:

`
  PUT /api/productos/{id}
`

- Eliminar un producto:

`
  DELETE /api/productos/{id}
`

### Usuarios (requiere permisos de administrador)

- Obtener todos los usuarios:

`
  GET /api/usuarios
`

- Obtener un usuario por ID:

`
  GET /api/usuarios/{id}
`

- Actualizar un usuario existente:

`
  PATCH /api/usuarios/{id}
`

- Eliminar un usuario:

`
  DELETE /api/usuarios/{id}
`

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama con tu funcionalidad:git checkout -b feature/NuevaFuncionalidad`.
3. Commit tus cambios:git commit -am 'Añade nueva funcionalidad'`.
4. Push a la rama:git push origin feature/NuevaFuncionalidad`.
5. Envía un pull request.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).