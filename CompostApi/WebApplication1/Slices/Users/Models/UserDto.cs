using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Slices.Devices.Models;

namespace WebApplication1.Slices.Users.Models
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public IEnumerable<Device> Devices { get; set; }
    }
}
