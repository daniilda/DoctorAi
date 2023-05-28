namespace DoctorAi.API.Dtos;

public class ReportByPatient : PatientReportMeta
{
    public Guid ReportId { get; init; }

    public ReportDocMeta DocMeta { get; init; } = null!;

    public Direction[] Directions { get; init; } = Array.Empty<Direction>();
}
