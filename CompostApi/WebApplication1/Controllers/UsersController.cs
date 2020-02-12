using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CompostApi.Models;
using WebApplication1.Slices.Users.Models;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WebApplication1.Infrastucture;

namespace WebApplication1.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CompostDataContext _context;
        private readonly IMapper _mapper;

        public UsersController(CompostDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: /users
        [HttpGet]
        [Authorize(Roles = "User")]
        public IActionResult GetUsers()
        {
            var users = _context.Users.Include(x => x.DeviceUsers).ThenInclude(x => x.Device.CompostData).ToList();
            var userDtos = _mapper.Map<List<UserDto>>(users);
            return Ok(userDtos);
        }

        // GET: users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id.ToString() != HttpContext.User.Identity.Name)
            {
                return Forbid();
            }

            var user = await _context.Users.Include(x => x.DeviceUsers).FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            var userDto = _mapper.Map<UserDto>(user);

            return Ok(userDto);
        }

        // PUT: users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] Guid id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: users
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (UserExists(user.Id, user.Email, user.Username)) return Conflict("A user with these details already exists");

            var hasher = new PasswordHasher<User>();
            var hashed = hasher.HashPassword(user, user.Password);
            user.Password = hashed;

            user.Id = new Guid();

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut("{id}/adddevice/{deviceId}")]
        public ActionResult AddDevice(Guid id, string deviceId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _context.Users.Find(id);
            if (user == null) return NotFound("User not found");

            var device = _context.Devices.Find(deviceId);
            if (device == null) return NotFound("Device not found");

            if (_context.DeviceUsers.Any(x => x.User == user && x.Device == device))
            {
                return Conflict("User already has device");
            }

            var deviceUser = new DeviceUser()
            {
                Id = new Guid(),
                Device = device,
                User = user
            };

            _context.DeviceUsers.Add(deviceUser);
            _context.SaveChanges();

            return CreatedAtAction("AddDevice", user);
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private bool UserExists(Guid id, string email, string username)
        {
            return _context.Users.Any(e => e.Id == id)
                || _context.Users.Any(x => x.Email == email)
                || _context.Users.Any(x => x.Username == username && username != null);
        }
    }
}