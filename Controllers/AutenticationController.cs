using Gestion_de_productos.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gestion_de_productos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticationController : ControllerBase
    {
        private readonly string secretKey;
        private readonly PruebasContext context;

        public AutenticationController(IConfiguration config, PruebasContext context)
        {
            this.context = context;
            secretKey = config.GetSection("settings:secretkey").ToString();
        }
    }
}
