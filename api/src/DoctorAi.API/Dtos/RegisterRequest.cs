namespace DoctorAi.API.Dtos;

public class RegisterRequest
{
    public string Username { get; init; } = null!;

    public string Password { get; init; } = null!;

    public string FirstName { get; init; } = null!;

    public string MiddleName { get; init; } = null!;

    public string LastName { get; init; } = null!;

    public string Position { get; init; } = null!;
}
