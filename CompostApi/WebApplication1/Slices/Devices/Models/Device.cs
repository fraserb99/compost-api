using CompostApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Slices.Devices.Models
{
    public class Device
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<CompostData> CompostData { get; set; }
    }
}
