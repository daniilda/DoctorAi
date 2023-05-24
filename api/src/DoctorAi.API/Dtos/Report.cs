namespace DoctorAi.API.Dtos;

public class Report : ReportMeta
{
    public ReportDocMeta[] DocMetas { get; init; } = Array.Empty<ReportDocMeta>();

    public string PdfUrl { get; init; } = null!;

    public string DocxUrl { get; init; } = null!;
}
