namespace DoctorAi.API.Dtos;

public class ReportByDoc : ReportDocMeta
{
    public Guid ReportId { get; init; }

    public PatientReportMeta[] Patients { get; init; } = Array.Empty<PatientReportMeta>();
}

public class ReportByDocDb
{

}
