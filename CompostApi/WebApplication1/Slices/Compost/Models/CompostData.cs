using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using WebApplication1.Slices.Devices.Models;

namespace CompostApi.Models
{
    public class CompostData
    {
        [Key]
        public Guid Id { get; set; }
        public string DeviceId { get; set; }
        public double Temperature { get; set; }
        public DateTime Created { get; set; }
    }
}