using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Slices.Users.Models;

namespace WebApplication1.Slices.Users
{
    interface IUserService
    {
        IEnumerable<User> GetById();
        User GetUser(Guid id);
        User Create(User user);
        User Delete(User user);
        User Authenticate(AuthenticateModel model);
    }
}
