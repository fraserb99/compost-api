using AutoMapper;
using CompostApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Infrastucture;
using WebApplication1.Slices.Devices;
using WebApplication1.Slices.Devices.Models;
using WebApplication1.Slices.Users.Models;

namespace WebApplication1.Controllers
{
    [Route("devices")]
    [ApiController]
    [Authorize]
    public class DeviceController : ControllerBase
    {
        private CompostDataContext _context;
        private IMapper Mapper;
        public DeviceController(CompostDataContext context, IMapper mapper)
        {
            _context = context;
            Mapper = mapper;
        }

        [HttpPost]
        public ActionResult Post([FromBody] Device device)
        {
            var dup = _context.Devices.Where(x => x.Id == device.Id);
            if (dup != null) return Conflict("This device already exists");
            _context.Devices.Add(device);
            _context.SaveChanges();
            return Ok(device);
        }

        [HttpGet]
        public ActionResult<List<DeviceDto>> Get()
        {
            var authedUser = HttpContext.User;
            var user = _context.Users.Include(x => x.DeviceUsers).ThenInclude(x => x.Device).FirstOrDefault(x => x.Id == new Guid(authedUser.Identity.Name));
            if (user == null) return Unauthorized();

            List<DeviceDto> devices;
            if (user.Role == Role.Admin)
                devices = Mapper.Map<List<DeviceDto>>(_context.Devices.ToList());
            else
            {
                var userDto = Mapper.Map<UserDto>(user);
                devices = userDto.Devices.ToList();
            }
            return Ok(devices);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Device> GetById(string id)
        {
            var device = _context.Devices.Where(x => x.Id == id).FirstOrDefault();

            if (device == null) return NotFound();

            return Ok(device);
        }

        [HttpPut]
        public ActionResult<Device> Update(Device deviceInput)
        {
            var device = _context.Devices.Where(x => x.Id == deviceInput.Id).FirstOrDefault();
            if (device == null) return NotFound();

            device.Name = deviceInput.Name;
            _context.Update(device);
            _context.SaveChanges();

            return Ok(device);
        }
    }
}
