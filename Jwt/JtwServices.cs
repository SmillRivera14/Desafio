using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Gestion_de_productos.Jwt
{
    /// <summary>
    /// Servicio para generar y verificar tokens JWT.
    /// </summary>
    public class JwtServices
    {
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Constructor de JwtServices.
        /// </summary>
        /// <param name="configuration">Configuración de la aplicación.</param>
        public JwtServices(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Genera un token JWT basado en el ID, nombre y rol del usuario.
        /// </summary>
        /// <param name="id">ID del usuario.</param>
        /// <param name="nombre">Nombre del usuario.</param>
        /// <param name="rol">Rol del usuario.</param>
        /// <returns>Token JWT generado.</returns>
        /// <response code="200">Token JWT generado exitosamente.</response>
        public string Generate(int id, string nombre, string rol)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"]);
            var symmetricSecurityKey = new SymmetricSecurityKey(key);
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            // Crear los claims basados en el usuario
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Name, nombre),
                new Claim("role", rol),
                new Claim(JwtRegisteredClaimNames.Sub, id.ToString())
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>
        /// Verifica la validez de un token JWT.
        /// </summary>
        /// <param name="jwt">Token JWT a verificar.</param>
        /// <returns>Token JWT verificado.</returns>
        /// <response code="200">Token JWT verificado exitosamente.</response>
        /// <response code="401">Error de autenticación: Token JWT no válido.</response>
        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["AppSettings:Token"]);

            try
            {
                tokenHandler.ValidateToken(jwt, new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out SecurityToken validatedToken);

                return (JwtSecurityToken)validatedToken;
            }
            catch (Exception ex)
            {
                throw new SecurityTokenException("Token JWT no válido.", ex);
            }
        }
    }
}
