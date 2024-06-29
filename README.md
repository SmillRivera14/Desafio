# Gestion de productos

Este proyecto es una aplicaci�n ASP.NET Core que gestiona productos y usuarios mediante una API RESTful. Utiliza Entity Framework Core para la persistencia de datos y JWT para la autenticaci�n de usuarios.

## Configuraci�n

### Requisitos previos

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [SQL Server](https://www.microsoft.com/sql-server)

### Instalaci�n

1. Clonar el repositorio:

   bash
   git clone https://github.com/tu-usuario/gestion-de-productos.git
   cd gestion-de-productos
   

2. Configurar la base de datos:

   - Aseg�rate de tener SQL Server instalado y configurado.
   - Actualiza la cadena de conexi�n enappsettings.json` bajoConnectionStrings` para que apunte a tu instancia de SQL Server:

   `json
     {
       "ConnectionStrings": {
         "AppConnection": "Server=localhost;Database=TuBaseDeDatos;Trusted_Connection=True;"
       }
     }
   `

3. Compilar y ejecutar la aplicaci�n:

   Desde la carpeta ra�z del proyecto:

 `bash
   dotnet build
   dotnet run
 `

   Esto compilar� y ejecutar� la aplicaci�n enhttps://localhost:5001` (por defecto).

4. Configurar CORS

   - La configuraci�n de CORS est� habilitada para permitir acceso desde diferentes or�genes. Puedes ajustar esta configuraci�n enStartup.cs` seg�n tus necesidades.

5. Documentaci�n de la API

   - La documentaci�n de la API est� disponible utilizando Swagger:
     - Navega ahttps://localhost:5001/swagger` para ver la documentaci�n interactiva de la API.

## Uso

### Usuarios y Autenticaci�n

- Registrar un nuevo usuario:

`
  POST /api/autentication/registrar
`
  
  Crea un nuevo usuario en la base de datos.

- Iniciar sesi�n:

`
  POST /api/autentication/login
`
  
  Inicia sesi�n y genera un token JWT que se almacena en las cookies.

- Obtener informaci�n del usuario:

`
  GET /api/autentication/user
`
  
  Devuelve la informaci�n del usuario autenticado utilizando el token JWT almacenado en las cookies.

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
3. Commit tus cambios:git commit -am 'A�ade nueva funcionalidad'`.
4. Push a la rama:git push origin feature/NuevaFuncionalidad`.
5. Env�a un pull request.

## Licencia

Este proyecto est� licenciado bajo la [Licencia MIT](LICENSE).