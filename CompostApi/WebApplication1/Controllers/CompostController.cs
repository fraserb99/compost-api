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
            if (data.Created == null)
            {
                data.Created = DateTime.UtcNow;
            }
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

        [HttpGet]
        [Route("{deviceId}")]
        public IActionResult GetForDevice(string deviceId, DateTime start, DateTime end, string res)
        {
            if (end < start) return BadRequest();

            int stepMins;
            switch (res)
            {
                case "5mins":
                    stepMins = 5;
                    break;

                case "30mins":
                    stepMins = 30;
                    break;

                case "1hour":
                    stepMins = 60;
                    break;

                default:
                    return BadRequest();
            }

            List<CompostData> compostData = new List<CompostData>();
            while (start < end)
            {
                var nextPoint = start.AddMinutes(stepMins);
                var data = _context.CompostData.Where(x => x.DeviceId == deviceId && x.Created >= start && x.Created < nextPoint).ToList();
                if (data.Count == 0)
                {
                    start = nextPoint;
                    continue;
                }
                var average = data.Average(x => x.Temperature);
                var newData = new CompostData
                {
                    Created = start,
                    Temperature = average,
                    DeviceId = deviceId,
                    Id = Guid.NewGuid()
                };
                compostData.Add(newData);

                start = nextPoint;
            }
            
            
            return Ok(compostData);
        }
    }
}