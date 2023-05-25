using System.Security.Claims;
using DoctorAi.API.Dtos;
using DoctorAi.API.Infrastructure.DataAccess;
using LinqToDB;
using LinqToDB.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAi.API.HttpControllers;

[ApiController]
[Route("report")]
public sealed class ReportController : ControllerBase
{
    // private readonly IAmazonS3 _amazonS3;
    private readonly AppDataConnection _db;

    public ReportController(AppDataConnection db)
        => _db = db;

    [HttpPost]
    [Route("create")]
    [Authorize]
    public async Task<ActionResult<Guid>> CreateReport([FromForm] CreateReportRequest request)
    {
        var id = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var reportId = Guid.NewGuid();
        await _db.BeginTransactionAsync();
        await _db.InsertAsync(
            new ReportDb
            {
                ReportName = request.ReportName,
                IsReady = false,
                CreatedAt = DateTime.UtcNow,
                CreatorId = Guid.Parse(id),
                Id = reportId,
            });


        foreach (var file in request.FileCollection)
        {
            switch (file.ContentType)
            {
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    await ParseDocxAsync(file);
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    await ParseXlsxAsync(file);
                    break;
            }
        }

        await _db.CommitTransactionAsync();

        return reportId;
    }

    [HttpGet]
    [Route("list")]
    [Authorize]
    public async Task<ActionResult<Report[]>> GetReports([FromQuery] int page = 1)
    {
        var id = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var reports = _db.Reports.Where(x => x.CreatorId == Guid.Parse(id));
        var creator = await _db.Users.FirstAsync(z => z.Id == Guid.Parse(id));
        return reports.Select(
            x => new Report
            {
                Id = x.Id,
                ReportName = x.ReportName,
                IsReady = x.IsReady,
                DocxUrl = x.DocxUrl,
                CreatedAt = x.CreatedAt,
                Creator = new User()
                {
                    Username = creator.Username,
                    Id = creator.Id,
                    FirstName = creator.FirstName,
                    PicUrl = creator.PicUrl,
                    LastName = creator.LastName,
                    MiddleName = creator.MiddleName,
                    Position = creator.Position
                },
                ReportDocs = null,
                PdfUrl = x.PdfUrl,
            }).ToArray();
    }


    [HttpGet]
    [Route("{id:guid}")]
    [Authorize]
    public async Task<ActionResult<Report>> GetReport([FromRoute] Guid id)
    {
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var creator = await _db.Users.FirstAsync(z => z.Id == Guid.Parse(userId));
        var report = await _db.Reports.FirstOrDefaultAsync(x => x.Id == id);
        if (report is null)
            return NotFound();
        var docsDb = _db.Docs.Where(
            x => x.Id.In(_db.Links.Where(y => y.ReportId == report.Id).Select(y => y.ReportDocId)));

        return new Report
        {
            Id = report.Id,
            ReportName = report.ReportName,
            IsReady = report.IsReady,
            DocxUrl = report.DocxUrl,
            CreatedAt = report.CreatedAt,
            Creator = new User()
            {
                Username = creator.Username,
                Id = creator.Id,
                FirstName = creator.FirstName,
                PicUrl = creator.PicUrl,
                LastName = creator.LastName,
                MiddleName = creator.MiddleName,
                Position = creator.Position
            },
            ReportDocs = docsDb.Select(
                z => new ReportDoc
                {
                    Id = z.Id,
                    FirstName = z.FirstName,
                    LastName = z.FirstName,
                    PdfUrl = z.PdfUrl!,
                    DocxUrl = z.DocxUrl!,
                    MiddleName = z.MiddleName,
                    Rate = z.Rate!.Value,
                    ReportPatients = null,
                    Position = z.Position
                }).ToArray(),
            PdfUrl = report.PdfUrl,
        };
    }

    [HttpGet]
    [Route("{id:guid}/{docId:guid}")]
    [Authorize]
    public async Task<ActionResult<ReportDoc>> GetReport([FromRoute] Guid id, [FromRoute] Guid docId)
    {
        var report = await _db.Docs.FirstOrDefaultAsync(x => x.Id == docId);
        if (report is null)
            return NotFound();
        var patientDb = _db.Patients.Where(
            x => x.Id.In(
                _db.Links.Where(y => y.ReportId == id && y.ReportDocId == report.Id).Select(y => y.ReportPatientId)));

        return new ReportDoc
        {
            Id = report.Id,
            DocxUrl = report.DocxUrl!,
            ReportPatients = patientDb.Select(
                z => new ReportPatient
                {
                    Id = z.Id,
                    FirstName = z.FirstName,
                    LastName = z.LastName,
                    PdfUrl = z.PdfUrl!,
                    DocxUrl = z.DocxUrl!,
                    MiddleName = z.MiddleName,
                    Diagnosis = z.Diagnosis,
                    ReportAppointments = null
                }).ToArray(),
            PdfUrl = report.PdfUrl!,
            Rate = report.Rate!.Value,
            FirstName = report.FirstName,
            LastName = report.LastName,
            MiddleName = report.MiddleName,
            Position = report.Position
        };
    }

    [HttpGet]
    [Route("{id:guid}/{docId:guid}/{patient:guid}")]
    [Authorize]
    public async Task<ActionResult<ReportPatient>> GetReport(
        [FromRoute] Guid id,
        [FromRoute] Guid docId,
        [FromRoute] Guid patient)
    {
        var report = await _db.Patients.FirstOrDefaultAsync(x => x.Id == patient);
        if (report is null)
            return NotFound();
        var appointmentDb = _db.Appointments.Where(
            x => x.Id.In(
                _db.Links.Where(y => y.ReportId == id && y.ReportDocId == docId && y.ReportPatientId == report.Id)
                    .Select(y => y.ReportAppointmentId)));

        return new ReportPatient()
        {
            Id = report.Id,
            DocxUrl = report.DocxUrl!,
            ReportAppointments = appointmentDb.Select(
                z => new ReportAppointment()
                {
                    AppointmentState = z.AppointmentState,
                    Name = z.Name,
                    Id = z.Id
                }).ToArray(),
            PdfUrl = report.PdfUrl!,
            Diagnosis = report.Diagnosis,
            FirstName = report.FirstName,
            LastName = report.LastName,
            MiddleName = report.MiddleName,
        };
    }

    private Task ParseDocxAsync(IFormFile file)
        => Task.CompletedTask;

    private Task ParseXlsxAsync(IFormFile file)
        => Task.CompletedTask;
}
