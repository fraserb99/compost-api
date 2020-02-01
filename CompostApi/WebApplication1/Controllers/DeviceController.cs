﻿using CompostApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Slices.Devices;
using WebApplication1.Slices.Devices.Models;

namespace WebApplication1.Controllers
{
    [Route("devices")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private CompostDataContext _context;
        public DeviceController(CompostDataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public void Post([FromBody] Device device)
        {
            _context.Devices.Add(device);
            _context.SaveChanges();
        }

        [HttpGet]
        public ActionResult<List<Device>> Get()
        {
            var devices = _context.Devices.Include(device => device.CompostData).ToList();
            return Ok(devices);
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