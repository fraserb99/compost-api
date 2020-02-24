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

        [HttpPost]
        public ActionResult CreateData()
        {
            var date = new DateTime(2020, 2, 1);
            var endDate = new DateTime(2020, 2, 20);

            var first = _context.CompostData.Where(x => x.Created == date).FirstOrDefault();
            if (first == null) throw new NullReferenceException();
            first.Moisture = 50;
            first.Depth = 60;
            _context.SaveChanges();

            var rand = new Random();
            var data = first;

            while (date < endDate)
            {
                if (data == null) continue;
                date = date.AddMinutes(5);
                var newData = _context.CompostData.Where(x => x.Created == date).FirstOrDefault();
                if (newData == null) continue;
                
                var minMoist = data.Moisture - 2 > 20 ? data.Moisture - 2 : 20;
                var maxMoist = data.Moisture + 3 < 100 ? data.Moisture + 3 : 100;
                var newMoist = rand.Next(minMoist, maxMoist);

                var minDepth = data.Depth - 2 > 20 ? data.Depth - 2 : 20;
                var maxDepth = data.Depth + 3 < 150 ? data.Depth + 3 : 150;
                var newDepth = rand.Next(minDepth, maxDepth);

                newData.Moisture = newMoist;
                newData.Depth = newDepth;

                data = newData;

                _context.SaveChanges();
            }

            return Ok();
        }
    }
}