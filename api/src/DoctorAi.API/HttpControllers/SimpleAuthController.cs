using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAi.API.HttpControllers;

[ApiController]
[Route("api/v1/sauth")]
public sealed class SimpleAuthController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<ActionResult<string>> Register([FromBody]string login)
    {
        await Task.Delay(1);
        return Ok();
    }
}
