using LinqToDB.Mapping;

namespace DoctorAi.API.Dtos;

[Table("reports_link")]
public class ReportLinkDb
{
    [Column("report_id")]
    public Guid ReportId { get; set; }

    [Column("report_doc_od")]
    public Guid ReportDocId { get; set; }

    [Column("report_patient_id")]
    public Guid ReportPatientId { get; set; }

    [Column("report_appointment_id")]
    public Guid ReportAppointmentId { get; set; }
}

[Table("reports_appointment")]
public class ReportAppointmentDb
{
    [PrimaryKey]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [Column("state")]
    public AppointmentState? AppointmentState { get; set; }
}

[Table("reports_doc")]
public class ReportDocDb
{
    [Column("id")]
    [PrimaryKey]
    public Guid Id { get; set; }

    [Column("first_name")]
    public string FirstName { get; set; } = null!;

    [Column("middle_name")]
    public string MiddleName { get; set; } = null!;

    [Column("last_name")]
    public string LastName { get; set; } = null!;

    [Column("position")]
    public string Position { get; set; } = null!;

    [Column("rate")]
    public int? Rate { get; set; }

    [Column("pdf_url")]
    public string? PdfUrl { get; set; } = null!;

    [Column("docx_url")]
    public string? DocxUrl { get; set; } = null!;
}

[Table("reports_patient")]
public class ReportPatientDb
{
    [Column("id")]
    [PrimaryKey]
    public Guid Id { get; set; }

    [Column("first_name")]
    public string FirstName { get; set; } = null!;

    [Column("middle_name")]
    public string MiddleName { get; set; } = null!;

    [Column("last_name")]
    public string LastName { get; set; } = null!;

    [Column("diagnosis")]
    public string Diagnosis { get; set; } = null!;

    [Column("pdf_url")]
    public string? PdfUrl { get; set; } = null!;

    [Column("docx_url")]
    public string? DocxUrl { get; set; } = null!;
}

[Table("reports")]
public class ReportDb
{
    [PrimaryKey]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("report_name")]
    public string ReportName { get; set; } = null!;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("creator_id")]
    public Guid CreatorId { get; set; }

    [Column("is_ready")]
    public bool IsReady { get; set; }

    [Column("pdf_url")]
    public string? PdfUrl { get; set; } = null!;

    [Column("docx_url")]
    public string? DocxUrl { get; set; } = null!;
}
