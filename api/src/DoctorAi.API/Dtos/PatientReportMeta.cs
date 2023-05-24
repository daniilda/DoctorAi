namespace DoctorAi.API.Dtos;

public class PatientReportMeta
{
    public Guid Id { get; init; }

    public string FirstName { get; init; } = null!;

    public string MiddleName { get; init; } = null!;

    public string LastName { get; init; } = null!;

    public string Diagnosis { get; init; } = null!;
}
