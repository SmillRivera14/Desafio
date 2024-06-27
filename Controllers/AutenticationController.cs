using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Gestion_de_productos.Models;
using Microsoft.EntityFrameworkCore;

namespace Gestion_de_productos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticationController : ControllerBase
    {
        private readonly PruebasContext _context;
        private readonly IConfiguration _configuration;

        public AutenticationController(PruebasContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<Usuario>> Registrar(Usuario request)
        {
            // Verificar si el nombre de usuario ya existe
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

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UsuariosDTO request)
        {
            var user = _context.Usuarios.SingleOrDefault(u => u.Nombre == request.Nombre);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.HashContraseña, user.HashContraseña))
            {
                return BadRequest("Usuario o contraseña incorrecta/o");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        private string CreateToken(Usuario user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Name, user.Nombre),
                new Claim("role", $"{user.Rol}")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
