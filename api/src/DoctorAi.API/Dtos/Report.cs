namespace DoctorAi.API.Dtos;

public class Report
{
    public Guid Id { get; set; }

    public string ReportName { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public User Creator { get; set; } = null!;

    public bool IsReady { get; set; }

    public ReportDoc[]? ReportDocs { get; set; } = Array.Empty<ReportDoc>();

    public string? PdfUrl { get; set; } = null!;

    public string? DocxUrl { get; set; } = null!;
}

public class ReportDoc
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Position { get; set; } = null!;

    public int Rate { get; set; }

    public ReportPatient[]? ReportPatients { get; set; }

    public string PdfUrl { get; set; } = null!;

    public string DocxUrl { get; set; } = null!;
}

public class ReportPatient
{
    public Guid Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Diagnosis { get; set; } = null!;

    public ReportAppointment[]? ReportAppointments { get; set; }

    public string PdfUrl { get; set; } = null!;

    public string DocxUrl { get; set; } = null!;
}

public class ReportAppointment
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public AppointmentState? AppointmentState { get; set; }
}
