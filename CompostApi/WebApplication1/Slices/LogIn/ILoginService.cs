using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Slices.Users.Models;

namespace WebApplication1.Slices.LogIn
{
    public interface ILoginService
    {
        string CreateToken(User user);
    }
}
