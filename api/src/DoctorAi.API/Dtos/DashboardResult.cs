namespace DoctorAi.API.Dtos;

public class DashboardResult
{
    public int? AvgPerc { get; init; }

    public string? TopDivisionName { get; init; } = null!;

    public int? TopDivisionPerc { get; init; }

    public string? LastDivisionName { get; init; } = null!;

    public int? LastDivisionPerc { get; init; }

    public string? Top1 { get; init; }= null!;
    public int? Top1Val { get; init; }

    public string? Top2 { get; init; }= null!;
    public int? Top2Val { get; init; }

    public string? Top3 { get; init; } = null!;
    public int? Top3Val { get; init; }
}
