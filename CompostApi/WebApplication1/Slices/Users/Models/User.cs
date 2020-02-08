using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Infrastucture;
using WebApplication1.Slices.Devices.Models;

namespace WebApplication1.Slices.Users.Models
{
    public class User
    {
        public Guid Id { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public string Username { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public Role Role { get; set; }
        public List<DeviceUser> DeviceUsers { get; set; }
        public List<Device> Devices { get; set; }
    }
}
