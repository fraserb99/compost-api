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
using WebApplication1.Slices.Users.Models;

namespace WebApplication1.Controllers
{
    [Route("login")]
    public class LoginController : ControllerBase
    {
        private readonly CompostDataContext _context;
        private readonly AppSettings _settings;
        private readonly IMapper _mapper;

        public LoginController(CompostDataContext context, IOptions<AppSettings> settings, IMapper mapper)
        {
            _context = context;
            _settings = settings.Value;
            _mapper = mapper;
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

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_settings.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var userDto = _mapper.Map<UserDto>(user);
            userDto.Token = tokenHandler.WriteToken(token);
            return Ok(userDto);
        }
    }
}
