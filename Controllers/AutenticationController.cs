using Microsoft.AspNetCore.Mvc;
using Gestion_de_productos.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using Microsoft.AspNetCore.Http;
using Gestion_de_productos.Jwt;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using System.Text;

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

        [HttpPost("registrar")]
        public async Task<ActionResult<Usuario>> Registrar(Usuario request)
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

            return Ok(new { message = "Usuario registrado existosamente" });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDTO request)
        {
            var user = _context.Usuarios.SingleOrDefault(u => u.Nombre == request.Nombre);
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

            return Ok(new { message = "Success" });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                if (!Request.Cookies.TryGetValue("jwt", out var jwt))
                {
                    return Unauthorized("No JWT token found in cookies");
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
                return Unauthorized($"Token verification failed: {ex.Message}");
            }
            catch (Exception ex)
            {
                return Unauthorized($"An error occurred: {ex.Message}");
            }
        }
    }
}
