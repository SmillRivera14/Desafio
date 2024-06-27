using System;
using System.Collections.Generic;

namespace Gestion_de_productos.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string Nombre { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Rol { get; set; } = null!;
}
