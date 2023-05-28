using System.Security.Claims;
using DoctorAi.API.Dtos;
using DoctorAi.API.Infrastructure.Authorization.Extensions;
using DoctorAi.API.Infrastructure.DataAccess;
using LinqToDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAi.API.HttpControllers;

[ApiController]
[Route("api/v1/sauth")]
public sealed class SimpleAuthController : ControllerBase
{
    private readonly AppDataConnection _db;

    public SimpleAuthController(AppDataConnection db)
        => _db = db;

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult<string>> Register([FromBody]RegisterRequest request)
    {
        var users = _db.Users.Where(x => x.Username == request.Username);
        if (!users.Any())
        {
            var id = Guid.NewGuid();
            await _db.InsertAsync(
                new UserDb
                {
                    Id = id,
                    Username = request.Username,
                    Password = request.Password,
                    Position = request.Position,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    MiddleName = request.MiddleName,
                    PicUrl = ""
                });
            return Ok(id.GenerateJwtToken());
        }
        else
        {
            return BadRequest("Already Exists");
        }
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(x => x.Username == request.Username);
        if (user is null)
            return NotFound();

        if (user.Password == request.Password)
            return Ok(user.Id.GenerateJwtToken());
        return BadRequest();
    }

    [HttpGet]
    [Authorize]
    [Route("user")]
    public async Task<ActionResult<User>> GetUser()
    {
        var id = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var user = await _db.Users.FirstAsync(x => x.Id == Guid.Parse(id));
        return Ok(
            new User
            {
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                Id = user.Id,
                LastName = user.LastName,
                Position = user.Position,
                PicUrl = user.PicUrl,
                Username = user.Username
            });
    }
}
