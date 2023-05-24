namespace DoctorAi.API.Dtos;

public class ReportMeta
{
    public Guid Id { get; init; }

    public string ReportName { get; init; } = null!;

    public DateTime CreatedAt { get; init; }

    public Guid CreatorId { get; init; }

    public bool IsReady { get; init; }
}
