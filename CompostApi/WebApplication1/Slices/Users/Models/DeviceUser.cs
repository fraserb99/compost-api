using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Slices.Devices.Models;

namespace WebApplication1.Slices.Users.Models
{
    public class DeviceUser
    {
        public Guid Id { get; set; }
        public Device Device { get; set; }
        public User User { get; set; }
    }
}
