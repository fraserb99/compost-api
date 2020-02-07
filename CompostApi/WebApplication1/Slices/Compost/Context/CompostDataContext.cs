using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Slices.Devices.Models;
using WebApplication1.Slices.Users.Models;

namespace CompostApi.Models
{
    public class CompostDataContext : DbContext
    {
        public CompostDataContext()
        {
            //this.Database.EnsureCreated();
            this.Database.Migrate();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:compostmonitor.database.windows.net,1433;Initial Catalog=Compost;Persist Security Info=False;User ID=fraser.bell;Password=L7t22pc8kyIO;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            base.OnConfiguring(optionsBuilder);
        }

        internal DbSet<CompostData> CompostData { get; set; }
        internal DbSet<Device> Devices { get; set; }
        internal DbSet<User> Users { get; set; }
        internal DbSet<DeviceUser> DeviceUsers { get; set; }
    }
}