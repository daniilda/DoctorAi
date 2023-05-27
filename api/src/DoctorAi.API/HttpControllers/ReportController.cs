using System.Security.Claims;
using ClosedXML.Excel;
using DoctorAi.API.Dtos;
using DoctorAi.API.Infrastructure.DataAccess;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using LinqToDB;
using LinqToDB.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Table = DocumentFormat.OpenXml.Wordprocessing.Table;

namespace DoctorAi.API.HttpControllers;

[ApiController]
[Route("report")]
public sealed class ReportController : ControllerBase
{
    // private readonly IAmazonS3 _amazonS3;
    private readonly AppDataConnection _db;

    public ReportController(AppDataConnection db)
        => _db = db;

    [HttpGet("dashboard")]
    [Authorize]
    public async Task<ActionResult<DashboardResult>> GetDashboard()
    {
        var lastDate = (await _db
            .Reports
            .OrderByDescending(z => z.CreatedAt)
            .FirstOrDefaultAsync())?.CreatedAt;
        if (lastDate is null)
            return NotFound();
        var reportsByDate = await _db.Reports
            .Where(x => x.CreatedAt.Between(lastDate.Value.AddDays(-7), lastDate.Value)).ToArrayAsync();
        if (!reportsByDate.Any())
            return NotFound();
        var doctors = _db.Docs
            .Where(
                x
                    => x.Id.In(
                        _db.Links.Where(z => z.ReportId.In(reportsByDate.Select(qw => qw.Id)))
                            .Select(qq => qq.ReportDocId))).ToArray();
        var hight = doctors.Select(z => z.Rate).Sum();
        var docRatesProc = (hight ?? 0) / doctors.Length * 10;
        var byDivision = doctors.GroupBy(z => z.Division);
        var orderedGroups = byDivision
            .OrderByDescending(z => z.ToArray().Select(q => q.Rate).Sum() / z.ToArray().Length * 10);
        var top1 = orderedGroups.First().Key;
        var top1Val = orderedGroups.First().ToArray().Select(q => q.Rate).Sum() / orderedGroups.First().ToArray().Length * 10;
        var topLast = orderedGroups.Last().Key;
        var topLastVal = orderedGroups.Last().ToArray().Select(q => q.Rate).Sum() / orderedGroups.Last().ToArray().Length * 10;
        var groupedDoctors = doctors.GroupBy(q => new {Fio = q.LastName + " " + q.FirstName + " " + q.MiddleName, Position = q.Position});
        var orderedDoctors =
            groupedDoctors.OrderByDescending(z => z.ToArray().Select(e => e.Rate).Sum() / z.ToArray().Length * 10).ToArray();
        string Top1 = "", Top2 = "", Top3 = "";
        int Top1Val = 0, Top2Val = 0, Top3Val = 0;
        if (orderedDoctors.Length > 0)
        {
            Top1 = orderedDoctors[0].Key.Fio;
            Top1Val = orderedDoctors[0].ToArray().Select(e => e.Rate).Sum() / orderedDoctors[0].ToArray().Length * 10?? 0;
        }

        if (orderedDoctors.Length > 1)
        {
            Top2 = orderedDoctors[1].Key.Fio;
            Top2Val = orderedDoctors[1].ToArray().Select(e => e.Rate).Sum() / orderedDoctors[0].ToArray().Length * 10 ?? 0;
        }

        if (orderedDoctors.Length > 2)
        {
            Top3 = orderedDoctors[2].Key.Fio;
            Top3Val = orderedDoctors[2].ToArray().Select(e => e.Rate).Sum() / orderedDoctors[0].ToArray().Length * 10?? 0;
        }

        return Ok(
            new DashboardResult
            {
                AvgPerc = docRatesProc,
                TopDivisionName = top1,
                TopDivisionPerc = top1Val ?? 0,
                LastDivisionPerc = topLastVal ?? 0,
                LastDivisionName = topLast,
                Top1 = Top1,
                Top1Val = Top1Val,
                Top2 = Top2,
                Top2Val = Top2Val,
                Top3 = Top3,
                Top3Val = Top3Val
            });
    }

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
                DocxUrl = "",
                PdfUrl = ""
            });

        var docDbs = new List<ReportDocDb>();


        foreach (var file in request.FileCollection)
        {
            switch (file.ContentType)
            {
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    await ParseDocxAsync(file, reportId, docDbs);
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    await ParseXlsxAsync(file);
                    break;
            }
        }

        foreach (var reportDocDb in docDbs)
        {
            await _db.InsertAsync(reportDocDb);
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
        var linksDb = _db.Links.Where(y => y.ReportId == report.Id).Select(x => x.ReportDocId);
        var docsDb = _db.Docs.Where(
            x => x.Id.In(linksDb));

        var zx = docsDb.ToArray();

        var report1 = new Report
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
            ReportDocs = zx.Select(
                z => new ReportDoc
                {
                    Id = z.Id,
                    FirstName = z.FirstName,
                    LastName = z.FirstName,
                    PdfUrl = z.PdfUrl!,
                    DocxUrl = z.DocxUrl!,
                    MiddleName = z.MiddleName,
                    Rate = z.Rate,
                    Division = z.Division,
                    ReportPatients = _db.Patients.Where(
                        x
                            => x.Id.In(
                                _db.Links.Where(y => y.ReportDocId == z.Id)
                                    .Select(l => l.ReportPatientId))).ToArray().Select(
                        GetReportPatient).ToArray(),
                    Position = z.Position
                }).ToArray(),
            PdfUrl = report.PdfUrl,
        };

        return report1;
    }

    int? Calc(ReportAppointment[] appoint)
    {
        var good = appoint.Count(qw => qw.AppointmentState == AppointmentState.Set);
        var bad = appoint.Count(qw => qw.AppointmentState == AppointmentState.Unset);
        var additional = appoint.Count(qw => qw.AppointmentState == AppointmentState.Additional);
        if (bad == 0 && good == 0)
            return null;
        if (bad == 0 && additional > 0)
            return 3;
        if (bad == 0)
            return 1;
        return 2;
    }

    ReportPatient GetReportPatient(ReportPatientDb u)
    {
        var appoint = _db.Appointments.Where(
            x => x.Id.In(
                _db.Links.Where(y => y.ReportPatientId == u.Id)
                    .Select(q => q.ReportAppointmentId))).Select(
            w => new ReportAppointment()
            {
                AppointmentState = w.AppointmentState,
                Name = w.Name,
                Id = w.Id
            }).ToArray();
        return new ReportPatient
        {
            Id = u.Id,
            FirstName = u.FirstName,
            LastName = u.LastName,
            PdfUrl = u.PdfUrl!,
            DocxUrl = u.DocxUrl!,
            MiddleName = u.MiddleName,
            Diagnosis = u.Diagnosis,
            ReportAppointments = appoint,
            Rate = Calc(appoint)
        };
    }

    #region deprecated

    // [HttpGet]
    // [Route("{id:guid}/{docId:guid}")]
    // [Authorize]
    // public async Task<ActionResult<ReportDoc>> GetReport([FromRoute] Guid id, [FromRoute] Guid docId)
    // {
    //     var report = await _db.Docs.FirstOrDefaultAsync(x => x.Id == docId);
    //     if (report is null)
    //         return NotFound();
    //     var patientDb = _db.Patients.Where(
    //         x => x.Id.In(
    //             _db.Links.Where(y => y.ReportId == id && y.ReportDocId == report.Id).Select(y => y.ReportPatientId)));
    //
    //     return new ReportDoc
    //     {
    //         Id = report.Id,
    //         DocxUrl = report.DocxUrl!,
    //         ReportPatients = patientDb.Select(
    //             z => new ReportPatient
    //             {
    //                 Id = z.Id,
    //                 FirstName = z.FirstName,
    //                 LastName = z.LastName,
    //                 PdfUrl = z.PdfUrl!,
    //                 DocxUrl = z.DocxUrl!,
    //                 MiddleName = z.MiddleName,
    //                 Diagnosis = z.Diagnosis,
    //                 ReportAppointments = null
    //             }).ToArray(),
    //         PdfUrl = report.PdfUrl!,
    //         Rate = report.Rate!.Value,
    //         FirstName = report.FirstName,
    //         LastName = report.LastName,
    //         MiddleName = report.MiddleName,
    //         Position = report.Position
    //     };
    // }
    //
    // [HttpGet]
    // [Route("{id:guid}/{docId:guid}/{patient:guid}")]
    // [Authorize]
    // public async Task<ActionResult<ReportPatient>> GetReport(
    //     [FromRoute] Guid id,
    //     [FromRoute] Guid docId,
    //     [FromRoute] Guid patient)
    // {
    //     var report = await _db.Patients.FirstOrDefaultAsync(x => x.Id == patient);
    //     if (report is null)
    //         return NotFound();
    //     var appointmentDb = _db.Appointments.Where(
    //         x => x.Id.In(
    //             _db.Links.Where(y => y.ReportId == id && y.ReportDocId == docId && y.ReportPatientId == report.Id)
    //                 .Select(y => y.ReportAppointmentId)));
    //
    //     return new ReportPatient()
    //     {
    //         Id = report.Id,
    //         DocxUrl = report.DocxUrl!,
    //         ReportAppointments = appointmentDb.Select(
    //             z => new ReportAppointment()
    //             {
    //                 AppointmentState = z.AppointmentState,
    //                 Name = z.Name,
    //                 Id = z.Id
    //             }).ToArray(),
    //         PdfUrl = report.PdfUrl!,
    //         Diagnosis = report.Diagnosis,
    //         FirstName = report.FirstName,
    //         LastName = report.LastName,
    //         MiddleName = report.MiddleName,
    //     };
    // }

    #endregion

    private async Task ParseDocxAsync(IFormFile file, Guid reportId, List<ReportDocDb> docDbs)
    {
        await Task.Delay(1);
        using var doc = WordprocessingDocument.Open(file.OpenReadStream(), false);
        var doctorTable = doc.MainDocumentPart!.Document.Body!
            .Descendants<Table>().First(x => x.Descendants<TableProperties>().First().TableCaption!.Val == "doctor");
        var doctorTableRows = doctorTable.Descendants<TableRow>().ToArray();
        var docLastName = doctorTableRows[0].Descendants<TableCell>().ToArray()[1].InnerText;
        var docFirstName = doctorTableRows[1].Descendants<TableCell>().ToArray()[1].InnerText;
        var docMiddleName = doctorTableRows[2].Descendants<TableCell>().ToArray()[1].InnerText;
        var docPosition = doctorTableRows[3].Descendants<TableCell>().ToArray()[1].InnerText;
        var docDivision = doctorTableRows[4].Descendants<TableCell>().ToArray()[1].InnerText;

        var docDb = docDbs.FirstOrDefault(
            x => x.FirstName == docFirstName &&
                 x.LastName == docLastName && x.FirstName == docFirstName && x.Position == docPosition
                 && x.Division == docDivision) ?? new ReportDocDb
        {
            Id = Guid.NewGuid(),
            FirstName = docFirstName,
            LastName = docLastName,
            MiddleName = docMiddleName,
            Division = docDivision,
            Position = docPosition,
        };
        if (docDbs.FirstOrDefault(
                x => x.FirstName == docFirstName &&
                     x.LastName == docLastName && x.FirstName == docFirstName && x.Position == docPosition
                     && x.Division == docDivision) is null)
            docDbs.Add(docDb);
        var patientTable = doc.MainDocumentPart!.Document.Body!
            .Descendants<Table>().First(x => x.Descendants<TableProperties>().First().TableCaption!.Val == "patient");
        var patientTableRows = patientTable.Descendants<TableRow>().ToArray();
        var patLastName = patientTableRows[0].Descendants<TableCell>().ToArray()[1].InnerText;
        var patFirstName = patientTableRows[1].Descendants<TableCell>().ToArray()[1].InnerText;
        var patMiddleName = patientTableRows[2].Descendants<TableCell>().ToArray()[1].InnerText;
        var patDateOfBirth = patientTableRows[3].Descendants<TableCell>().ToArray()[1].InnerText;
        var patSex = patientTableRows[4].Descendants<TableCell>().ToArray()[1].InnerText;
        var diagnosisTable = doc.MainDocumentPart!.Document.Body!
            .Descendants<Table>().First(x => x.Descendants<TableProperties>().First().TableCaption!.Val == "diagnosis");
        var diagnosisTableRows = diagnosisTable.Descendants<TableRow>().ToArray();
        var diagnArr = diagnosisTableRows[1].Descendants<TableCell>().ToArray();
        var code = diagnArr[0].InnerText;
        var diag = diagnArr[1].InnerText;
        var patDb = new ReportPatientDb
        {
            LastName = patLastName,
            FirstName = patFirstName,
            MiddleName = patMiddleName,
            Date = DateOnly.Parse(patDateOfBirth),
            Diagnosis = diag,
            Code = code,
            Sex = patSex,
            Id = Guid.NewGuid()
        };
        var appointmentsTable = doc.MainDocumentPart!.Document.Body!
            .Descendants<Table>()
            .First(x => x.Descendants<TableProperties>().First().TableCaption!.Val == "appointment");
        var appointmentsTableRows = appointmentsTable.Descendants<TableRow>().ToArray();
        var appointments = new List<ReportAppointmentDb>();
        foreach (var row in appointmentsTableRows)
        {
            appointments.Add(
                new ReportAppointmentDb
                {
                    AppointmentState = null,
                    Name = row.Descendants<TableCell>().First().InnerText,
                    Id = Guid.NewGuid()
                });
        }

        var links = new List<ReportLinkDb>();
        foreach (var appointment in appointments)
        {
            links.Add(
                new ReportLinkDb
                {
                    ReportId = reportId,
                    ReportDocId = docDb.Id,
                    ReportPatientId = patDb.Id,
                    ReportAppointmentId = appointment.Id
                });
        }

        foreach (var app in appointments)
        {
            await _db.InsertAsync(app);
        }

        foreach (var link in links)
        {
            await _db.InsertAsync(link);
        }

        await _db.InsertAsync(patDb);
    }

    private async Task ParseXlsxAsync(IFormFile file)
    {
        await Task.Delay(1);
        using var workbook = new XLWorkbook(file.OpenReadStream());
    }
}
