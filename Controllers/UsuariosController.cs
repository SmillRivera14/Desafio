using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gestion_de_productos.Models;
using Gestion_de_productos.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace Gestion_de_productos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly PruebasContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtServices _jwtServices;

        public UsuariosController(PruebasContext context, IConfiguration configuration, JwtServices jwtServices)
        {
            _context = context;
            _configuration = configuration;
            _jwtServices = jwtServices;
        }

        // GET: api/Usuarios
        /// <summary>
        /// Obtiene todos los usuarios.
        /// </summary>
        /// <returns>Lista de usuarios.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UsuarioDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetUsuarios()
        {
            try
            {
                if (!EsAdmin())
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "You do not have permission to access this resource.");
                }

                var usuarios = await _context.Usuarios.ToListAsync();
                var usuarioDTOs = usuarios.Select(u => new UsuarioDTO
                {
                    IdUsuario = u.IdUsuario,
                    Nombre = u.Nombre,
                    Email = u.Email,
                    Rol = u.Rol
                }).ToList();

                return usuarioDTOs;
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized($"Token verification failed: {ex.Message}");
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }
        }

        // GET: api/Usuarios/5
        /// <summary>
        /// Obtiene un usuario por su ID.
        /// </summary>
        /// <param name="id">ID del usuario.</param>
        /// <returns>Usuario encontrado.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(UsuarioDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UsuarioDTO>> GetUsuario(int id)
        {
            try
            {
                if (!EsAdmin())
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "You do not have permission to access this resource.");
                }

                var usuario = await _context.Usuarios.FindAsync(id);

                if (usuario == null)
                {
                    return NotFound();
                }

                var usuarioDTO = new UsuarioDTO
                {
                    IdUsuario = usuario.IdUsuario,
                    Nombre = usuario.Nombre,
                    Email = usuario.Email,
                    Rol = usuario.Rol
                };

                return usuarioDTO;
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }
        }

        // PUT: api/Usuarios/5
        /// <summary>
        /// Actualiza un usuario existente por su ID.
        /// </summary>
        /// <param name="id">ID del usuario a actualizar.</param>
        /// <param name="usuario">Datos actualizados del usuario.</param>
        /// <returns>Respuesta de éxito o error.</returns>
        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PatchUsuario(int id, Usuario usuario)
        {
            try
            {
                if (!EsAdmin())
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "You do not have permission to access this resource.");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != usuario.IdUsuario)
                {
                    return BadRequest();
                }

                _context.Entry(usuario).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UsuarioExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }
        }

        // DELETE: api/Usuarios/5
        /// <summary>
        /// Elimina un usuario por su ID.
        /// </summary>
        /// <param name="id">ID del usuario a eliminar.</param>
        /// <returns>Respuesta de éxito o error.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            try
            {
                if (!EsAdmin())
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "You do not have permission to access this resource.");
                }

                var usuario = await _context.Usuarios.FindAsync(id);
                if (usuario == null)
                {
                    return NotFound();
                }

                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest($"Error: {e.Message}");
            }
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.IdUsuario == id);
        }

        private bool EsAdmin()
        {
            // Verificar si el JWT está presente en las cookies
            if (!Request.Cookies.TryGetValue("jwt", out var jwt))
            {
                throw new SecurityTokenException("No JWT token found in cookies");
            }

            // Verificar el JWT y obtener los claims
            var token = _jwtServices.Verify(jwt);
            var claims = token.Claims.ToList();

            // Obtener el rol del usuario desde los claims
            var userRole = claims.FirstOrDefault(c => c.Type == "role")?.Value;

            // Si el usuario es un administrador
            return userRole?.ToLower() == "admin";
        }
    }
}
