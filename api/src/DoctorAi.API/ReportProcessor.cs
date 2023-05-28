using System.Security.Claims;
using Amazon.S3;
using DoctorAi.API.Dtos;
using DoctorAi.API.HttpControllers;
using DoctorAi.API.Infrastructure.DataAccess;
using LinqToDB;
using QuestPDF.Fluent;

namespace DoctorAi.API;

public class ReportProcessor : BackgroundService
{
    private readonly IServiceProvider _provider;
    private readonly IAmazonS3 _s3;
    private readonly CephOptions _cephOptions;

    public ReportProcessor(IServiceProvider provider, IAmazonS3 s3, CephOptions cephOptions)
    {
        _provider = provider;
        _s3 = s3;
        _cephOptions = cephOptions;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Yield();
        while (!stoppingToken.IsCancellationRequested)
        {
            await using var scope = _provider.CreateAsyncScope();
            var db = scope.ServiceProvider.GetService<AppDataConnection>()!;
            await db.BeginTransactionAsync(stoppingToken);
            var controller = new ReportController(db);
            var notReadyReports = await db.Reports
                .Where(z => !z.IsReady)
                .ToArrayAsync(token: stoppingToken);
            if (!notReadyReports.Any())
            {
                await Task.Delay(5000);
            }
            // тут должна быть ходка за данными в МЛ
            foreach (var nrr in notReadyReports)
            {
                nrr.IsReady = true;
                var qq = await controller.GetReport(nrr.Id);
                var template = new ReportTemplate(qq.Value!);
                var resultStream = new MemoryStream();
                template.GeneratePdf(resultStream);
                resultStream.Position = 0;
                await _s3.UploadObjectFromStreamAsync(
                    "doc-ai-reports",
                    $"{nrr.Id}.pdf",
                    resultStream,
                    default,
                    cancellationToken: stoppingToken);
                nrr.PdfUrl = _cephOptions.BucketName + "." + _cephOptions.S3Address + "/" + $"{nrr.Id}.pdf";
                await db.UpdateAsync(nrr, token: stoppingToken);
            }

            await db.CommitTransactionAsync(stoppingToken);
            await Task.Delay(5000, stoppingToken);
        }
    }
}
