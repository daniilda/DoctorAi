using Amazon.S3;
using DoctorAi.API.Dtos;
using DoctorAi.API.HttpControllers;
using DoctorAi.API.Infrastructure.DataAccess;
using LinqToDB;
using LinqToDB.Tools;
using QuestPDF.Fluent;

namespace DoctorAi.API;

public class ReportProcessor : BackgroundService
{
    private readonly IServiceProvider _provider;
    private readonly IAmazonS3 _s3;
    private readonly CephOptions _cephOptions;
    private readonly IHttpClientFactory _factory;

    public ReportProcessor(IServiceProvider provider, IAmazonS3 s3, CephOptions cephOptions, IHttpClientFactory factory)
    {
        _provider = provider;
        _s3 = s3;
        _cephOptions = cephOptions;
        _factory = factory;
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
                await Task.Delay(5000, stoppingToken);
            }

            using var client = _factory.CreateClient();
            // тут должна быть ходка за данными в МЛ
            foreach (var nrr in notReadyReports)
            {

                client.BaseAddress = new Uri(Environment.GetEnvironmentVariable("PYTHON_API") ?? "localhost");
                var links = await db.Links.Where(z => z.ReportId == nrr.Id).ToArrayAsync(token: stoppingToken);
                var doctors = links.Select(x => x.ReportDocId).Distinct().ToArray();
                var doctToPat = new Dictionary<Guid, List<Guid>>();
                var clientqqq = new Dictionary<Guid, Client>();
                foreach (var doc in doctors)
                {
                    var clients = links.Where(z => z.ReportDocId == doc).Select(q => q.ReportPatientId).Distinct();
                    foreach (var cli in clients)
                    {
                        if (doctToPat.TryGetValue(doc, out var value))
                        {
                            value.Add(cli);
                        }
                        else
                        {
                            doctToPat.Add(doc, new List<Guid>{ cli });
                        }
                        var qqqq = await db.Appointments.Where(
                            x => x.Id.In(
                                links.Where(z => z.ReportPatientId == cli).Select(q => q.ReportAppointmentId))).ToArrayAsync(token: stoppingToken);
                        var appoiq = await  db.Appointments.Where(x => x.Id.In(qqqq.Select(q => q.Id))).ToArrayAsync(token: stoppingToken);
                        var diag = (await db.Patients.FirstAsync(q => q.Id == cli, token: stoppingToken)).Diagnosis;
                        var pttp = appoiq.Select(
                            r => new Client
                            {
                                Diagnosis = diag
                                    ,
                                Ref = new Ref
                                {
                                    ByPoc = appoiq.Select(q => q.Name).ToArray()
                                }
                            });
                        foreach (var e in pttp)
                        {
                            clientqqq.TryAdd(cli, e);
                        }
                    }

                }

                var req = new MlRequest
                {
                    DoctorsIds = doctors,
                    DoctorsToClients = doctToPat.ToDictionary(x => x.Key, z => z.Value.ToArray()),
                    Clients = clientqqq.ToDictionary(x => x.Key, x => x.Value),
                };
                var response = await client.PostAsJsonAsync("calculate", req, stoppingToken);
                var resp = await response.Content.ReadFromJsonAsync<MLResponse>(cancellationToken: stoppingToken);
                foreach (var r in resp!.Rates)
                {
                    var weee = db.Docs.First(q => q.Id == r.Key);
                    weee.Rate = (int)r.Value;
                    await db.UpdateAsync(weee, token: stoppingToken);
                }

                foreach (var ref1 in resp.ReferralsInfo)
                {
                    foreach (var bad in ref1.Value.Bads)
                    {
                        var appId = Guid.NewGuid();
                        await db.InsertAsync(
                            new ReportAppointmentDb
                            {
                                AppointmentState = AppointmentState.Unset,
                                Name = bad,
                                Id = appId
                            },
                            token: stoppingToken);
                        await db.InsertAsync(
                            new ReportLinkDb
                            {
                                ReportId = nrr.Id,
                                ReportDocId = req.DoctorsToClients.First(z => z.Value.Contains(ref1.Key)).Key,
                                ReportPatientId = ref1.Key,
                                ReportAppointmentId = appId
                            },
                            token: stoppingToken);
                    }

                    var cli = await db.Appointments.Where(x => x.Name.In(ref1.Value.Goods)).ToArrayAsync(token: stoppingToken);
                    foreach (var q in cli)
                    {
                        q.AppointmentState = AppointmentState.Set;
                        await db.UpdateAsync(q, token: stoppingToken);
                    }

                    var cli2 = await db.Appointments.Where(x => x.Name.In(ref1.Value.Excessive)).ToArrayAsync(token: stoppingToken);;
                    foreach (var q in cli2)
                    {
                        q.AppointmentState = AppointmentState.Additional;
                        await db.UpdateAsync(q, token: stoppingToken);
                    }
                }

                await db.CommitTransactionAsync(stoppingToken);
                await db.BeginTransactionAsync(stoppingToken);
                nrr.IsReady = true;
                var qq = await controller.GetReport(nrr.Id);
                var template = new ReportTemplate(qq.Value!);
                var resultStream = new MemoryStream();
                template.GeneratePdf(resultStream);
                resultStream.Position = 0;
                await _s3.UploadObjectFromStreamAsync(
                    _cephOptions.BucketName,
                    $"{nrr.Id}.pdf",
                    resultStream,
                    default,
                    cancellationToken: stoppingToken);
                nrr.PdfUrl = "https://" + _cephOptions.BucketName + "." + _cephOptions.S3Address + "/"
                             + $"{nrr.Id}.pdf";
                await db.UpdateAsync(nrr, token: stoppingToken);
            }

            await db.CommitTransactionAsync(stoppingToken);
            await Task.Delay(5000, stoppingToken);
        }
    }
}
