using Microsoft.AspNetCore.Mvc;

namespace DoctorAi.API.HttpControllers;

[ApiController]
[Route("api/v1/echo")]
public sealed class EchoController : ControllerBase
{
    [HttpGet]
    public ActionResult<string> Echo(string input)
        => Ok();
}
