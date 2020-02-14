using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Infrastucture
{
    public class RoleNames
    {
        public static string User = Enum.GetName(typeof(Role), Role.User);
        public static string Admin = Enum.GetName(typeof(Role), Role.Admin);
    }
}
