namespace DoctorAi.API.Dtos;

public class LoginRequest
{
    public string Username { get; init; } = null!;

    public string Password { get; init; } = null!;
}
