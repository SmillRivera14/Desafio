using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Gestion_de_productos.Models;
using Microsoft.EntityFrameworkCore;
using Gestion_de_productos.Jwt;
using Microsoft.Extensions.Configuration;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Gestion_de_productos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticationController : ControllerBase
    {
        private readonly PruebasContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtServices _jwtServices;

        public AutenticationController(PruebasContext context, IConfiguration configuration, JwtServices jwtServices)
        {
            _context = context;
            _configuration = configuration;
            _jwtServices = jwtServices;
        }

        /// <summary>
        /// Registrar un nuevo usuario.
        /// </summary>
        /// <param name="request">Objeto Usuario con los datos del nuevo usuario.</param>
        /// <returns>Un ActionResult con el nuevo usuario registrado o un mensaje de error.</returns>
        [HttpPost("registrar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Usuario>> Registrar(Usuario request)
        {
            try
            {
                var existingUser = await _context.Usuarios.FirstOrDefaultAsync(u => u.Nombre == request.Nombre);
                if (existingUser != null)
                {
                    return Conflict("El nombre de usuario ya está en uso.");
                }

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.HashContraseña);

                var user = new Usuario
                {
                    Nombre = request.Nombre,
                    HashContraseña = passwordHash,
                    Email = request.Email,
                    Rol = request.Rol
                };

                _context.Usuarios.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Usuario registrado exitosamente" });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error guardando los cambios en la base de datos: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocurrió un error al registrar el usuario: {ex.Message}");
            }
        }

        /// <summary>
        /// Iniciar sesión de un usuario.
        /// </summary>
        /// <param name="request">Objeto LoginDTO con los datos de inicio de sesión.</param>
        /// <returns>Un ActionResult con el token JWT o un mensaje de error.</returns>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> Login(LoginDTO request)
        {
            try
            {
                var user = await _context.Usuarios.SingleOrDefaultAsync(u => u.Nombre == request.Nombre);
                if (user == null || !BCrypt.Net.BCrypt.Verify(request.HashContraseña, user.HashContraseña))
                {
                    return BadRequest("Usuario o contraseña incorrecta/o");
                }

                var jwt = _jwtServices.Generate(user.IdUsuario, user.Nombre, user.Rol);

                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddDays(1),
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    IsEssential = true
                });

                return Ok(new { message = "Inicio de sesión exitoso" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocurrió un error al iniciar sesión: {ex.Message}");
            }
        }

        /// <summary>
        /// Obtener información del usuario autenticado.
        /// </summary>
        /// <returns>Un ActionResult con los datos del usuario o un mensaje de error.</returns>
        [HttpGet("user")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult User()
        {
            try
            {
                if (!Request.Cookies.TryGetValue("jwt", out var jwt))
                {
                    return Unauthorized("No se encontró el token JWT en las cookies");
                }

                var token = _jwtServices.Verify(jwt);

                var claims = token.Claims.ToList();

                var userData = new
                {
                    Nombre = claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Name)?.Value,
                    Rol = claims.FirstOrDefault(c => c.Type == "role")?.Value,
                    Id = claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value
                };

                return Ok(userData);
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized($"La verificación del token falló: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocurrió un error: {ex.Message}");
            }
        }
    }
}
