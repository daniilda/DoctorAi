namespace DoctorAi.API.Dtos;

public class ReportDocMeta
{
    public Guid Id { get; init; }

    public string FirstName { get; init; } = null!;

    public string MiddleName { get; init; } = null!;

    public string LastName { get; init; } = null!;

    public string Position { get; init; } = null!;

    public int Rate { get; init; }
}
