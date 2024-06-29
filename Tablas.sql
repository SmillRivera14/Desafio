Create DATABASE Pruebas;
GO

USE Pruebas;
GO

CREATE TABLE Productos 
( 
    ID_producto INT IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(MAX),
    Precio MONEY NOT NULL,
    Stock INT NOT NULL,
    Fecha_Creacion DATETIME NOT NULL,
    Fecha_ultima_creacion DATETIME,
    CONSTRAINT PK_id_productos PRIMARY KEY (ID_producto)
);
GO

CREATE TABLE Usuarios
(
    ID_usuario INT IDENTITY(1,1),
    Nombre NVARCHAR(100) UNIQUE NOT NULL,
    HashContraseña NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Rol NVARCHAR(6) CHECK (Rol = 'Admin' OR Rol = 'User') NOT NULL,
    CONSTRAINT PK_id_usuarios PRIMARY KEY (ID_usuario)
);
GO

