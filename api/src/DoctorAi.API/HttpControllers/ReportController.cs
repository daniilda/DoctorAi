using AutoFixture;
using DoctorAi.API.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAi.API.HttpControllers;

[ApiController]
[Route("report")]
// [Authorize]
public sealed class ReportController : ControllerBase
{
    [HttpPost]
    [Route("create")]
    public ActionResult<Guid> CreateReport([FromForm] CreateReportRequest request)
        => Guid.NewGuid();

    [HttpGet]
    [Route("list")]
    public ActionResult<ReportMeta[]> GetReports([FromQuery] int page = 1)
        => Ok(new Fixture().CreateMany<ReportMeta>());

    [HttpGet]
    [Route("{id:guid}")]
    public ActionResult<Report> GetReport([FromRoute] Guid id)
        => Ok(new Fixture().Build<Report>().With(x => x.Id, id).Create());

    [HttpGet]
    [Route("{id:guid}/{docId:guid}")]
    public ActionResult<ReportByDoc> GetReport([FromRoute] Guid id, [FromRoute] Guid docId)
        => Ok(new Fixture().Build<ReportByDoc>().With(x => x.Id, docId).With(x => x.ReportId, id).Create());

    [HttpGet]
    [Route("{id:guid}/{docId:guid}/{patient:guid}")]
    public ActionResult<ReportByDoc> GetReport([FromRoute] Guid id, [FromRoute] Guid docId, [FromRoute] Guid patient)
        => Ok(
            new Fixture().Build<ReportByPatient>().With(x => x.Id, patient).With(x => x.ReportId, id).With(
                    x => x.DocMeta,
                    new Fixture().Build<ReportDocMeta>().With(x => x.Id, docId).Create())
                .Create());
}
