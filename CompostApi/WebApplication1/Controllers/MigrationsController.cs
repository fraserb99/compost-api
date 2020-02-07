using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompostApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Controllers
{
    [Route("migrate")]
    [ApiController]
    public class MigrationsController : ControllerBase
    {
        private CompostDataContext _context;

        public MigrationsController(CompostDataContext context)
        {
            _context = context;
        }

        [HttpPut]
        public ActionResult Migrate()
        {
            _context.Database.Migrate();
            return Ok("Migrations run");
        }
    }
}