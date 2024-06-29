using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;


namespace Gestion_de_productos.Models;

public partial class Usuario
{
    [BindNever]
    public int IdUsuario { get; set; }

    public string Nombre { get; set; } = null!;

    public string HashContraseña { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Rol { get; set; } = null!;
}
