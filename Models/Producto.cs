using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Gestion_de_productos.Models;

public partial class Producto
{
    [BindNever]
    public int IdProducto { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public decimal Precio { get; set; }

    public int Stock { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaUltimaCreacion { get; set; }
}
