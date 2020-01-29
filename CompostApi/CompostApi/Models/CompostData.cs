using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CompostApi.Models
{
    public class CompostData
    {
        public Guid DeviceId { get; set; }
        public double Temperature { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}