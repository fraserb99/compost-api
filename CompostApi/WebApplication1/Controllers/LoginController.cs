using AutoMapper;
using CompostApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Infrastucture;
using WebApplication1.Slices.LogIn;
using WebApplication1.Slices.Users.Models;

namespace WebApplication1.Controllers
{
    [Route("login")]
    public class LoginController : ControllerBase
    {
        private readonly CompostDataContext _context;
        private readonly AppSettings _settings;
        private readonly IMapper _mapper;
        private ILoginService _loginService;

        public LoginController(CompostDataContext context, IOptions<AppSettings> settings, IMapper mapper, ILoginService loginService)
        {
            _context = context;
            _settings = settings.Value;
            _mapper = mapper;
            _loginService = loginService;
        }
        [HttpPost]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            var hasher = new PasswordHasher<User>();
            var user = _context.Users.Where(x => x.Email == model.Email).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            var result = hasher.VerifyHashedPassword(user, user.Password, model.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Forbid();
            }

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Token = _loginService.CreateToken(user);
            return Ok(userDto);
        }
    }
}
