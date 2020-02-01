using CompostApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Slices.Devices;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Slices.Devices.Models;

namespace WebApplication1.Controllers
{
    [Route("compost")]
    [ApiController]
    public class CompostController : ControllerBase
    {
        private CompostDataContext _context;
        public CompostController(CompostDataContext context)
        {
            _context = context;
        }
        [HttpPost]
        public ActionResult Create(CompostData data)
        {
            var previous = _context.CompostData.AsQueryable().Where(x => x.DeviceId == data.DeviceId && x.Created == data.Created).FirstOrDefault();
            if (previous != null) return Conflict();

            var device = _context.Devices.Where(x => x.Id == data.DeviceId).FirstOrDefault();
            if (device == null)
            {
                device = new Device()
                {
                    Id = data.DeviceId
                };
                _context.Devices.Add(device);
                _context.SaveChanges();
            }

            data.Id = new Guid();
            _context.CompostData.Add(data);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public ActionResult<List<CompostData>> Get()
        {
            var data = _context.CompostData.ToList();
            return Ok(data);
        }
    }
}