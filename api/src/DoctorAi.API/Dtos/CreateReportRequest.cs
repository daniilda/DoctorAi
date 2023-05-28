namespace DoctorAi.API.Dtos;

public sealed class CreateReportRequest
{
    public IFormFileCollection FileCollection { get; init; } = null!;

    public string ReportName { get; init; } = null!;
}
