using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Infrastucture;
using WebApplication1.Slices.Users.Models;

namespace WebApplication1.Slices.Users.ObjectMapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(x => x.Devices, opt => opt.MapFrom(y => y.DeviceUsers.Select(x => x.Device)))
                .ForMember(x => x.Role, opt => opt.MapFrom(y => Enum.GetName(typeof(Role), y.Role)));
        }
    }
}
