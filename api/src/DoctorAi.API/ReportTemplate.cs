using System.Globalization;
using DoctorAi.API.Dtos;
using QRCoder;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace DoctorAi.API;

public class ReportTemplate : IDocument
{
    private readonly Report _report;

    public ReportTemplate(Report reportData)
        => _report = reportData;

    public void Compose(IDocumentContainer container)
        => container.Page(
            page =>
            {
                page.DefaultTextStyle(st => st.FontFamily("Arial"));
                page.Size(PageSizes.A4.Landscape());
                page.Header()
                    .Row(
                        row =>
                        {
                            row
                                .RelativeItem()
                                .Height(20)
                                .AlignLeft()
                                .Image("Resourses/Frame1.png")
                                .FitHeight();
                            row
                                .RelativeItem()
                                .AlignRight()
                                .Text(_report.Id.ToString())
                                .FontColor(Colors.Grey.Lighten2)
                                .FontSize(10);
                        });

                page.Footer()
                    .Container()
                    .AlignLeft()
                    .Text(_report.CreatedAt.ToString(CultureInfo.InvariantCulture))
                    .FontColor(Colors.Grey.Lighten2)
                    .FontSize(5);
                page.MarginVertical(10f);
                page.MarginHorizontal(30f);
                page
                    .Content()
                    .Column(
                        col =>
                        {
                            col
                                .Item()
                                .Row(
                                    rrr =>
                                    {
                                        rrr.RelativeItem().Container()
                                            .AlignMiddle()
                                            .Height(50)
                                            .AlignLeft()
                                            .Image("Resourses/Frame1.png")
                                            .FitHeight();

                                        var qrGenerator = new QRCodeGenerator();
                                        var qrCodeData = qrGenerator.CreateQrCode(
                                            $"{Environment.GetEnvironmentVariable("WEB_UI_URL") ?? "localhost/"}preview/{_report.Id}",
                                            QRCodeGenerator.ECCLevel.Q);
                                        var qrCode = new PngByteQRCode(qrCodeData);
                                        byte[] qrCodeImage = qrCode.GetGraphic(20);

                                        rrr.RelativeItem()
                                            .AlignRight()
                                            .Container()
                                            .Height(100)
                                            .Image(qrCodeImage)
                                            .FitHeight();
                                    });

                            col
                                .Item()
                                .Container()
                                .Text("Отчет правильности назначения исследований")
                                .Bold()
                                .FontSize(25);

                            col.Item().LineHorizontal(1);

                            col
                                .Item()
                                .Container()
                                .AlignLeft()
                                .Text($"Наименование отчета: {_report.ReportName}");

                            col
                                .Item()
                                .Container()
                                .AlignLeft()
                                .Text($"Дата создания отчета: {_report.CreatedAt}");

                            col
                                .Item()
                                .Container()
                                .AlignLeft()
                                .Text(
                                    $"Создан: {_report.Creator.Position} {_report.Creator.LastName} {_report.Creator.FirstName} {_report.Creator.MiddleName}");

                            col.Item().LineHorizontal(1);

                            foreach (var doc in _report.ReportDocs ?? Array.Empty<ReportDoc>())
                            {
                                col.Item().Container().Height(50);
                                col
                                    .Item()
                                    .Column(
                                        c
                                            =>
                                        {
                                            c.Item()
                                                .Row(
                                                    qqq =>
                                                    {
                                                        qqq.RelativeItem().Container()
                                                            .Text($"{doc.LastName} {doc.FirstName} {doc.MiddleName}")
                                                            .FontSize(20)
                                                            .FontColor(Colors.Grey.Darken3);
                                                        var text = qqq.RelativeItem().Container().AlignRight()
                                                            .Text(
                                                                $"Соответствие {(doc.Rate != null ? doc.Rate.Value : "--")} %")
                                                            .FontSize(20);
                                                        if (doc.Rate is null)
                                                            text.FontColor(Colors.Grey.Darken1);
                                                        if (doc.Rate >= 80)
                                                            text.FontColor(Colors.Green.Darken3);
                                                        if (doc.Rate < 80)
                                                            text.FontColor(Colors.Green.Darken1);
                                                        if (doc.Rate <= 60)
                                                            text.FontColor(Colors.Orange.Darken1);
                                                        if (doc.Rate <= 40)
                                                            text.FontColor(Colors.Red.Darken1);
                                                    });
                                            c.Item()
                                                .Container()
                                                .Text(doc.Position)
                                                .FontSize(15)
                                                .FontColor(Colors.Grey.Darken2);
                                            c.Item()
                                                .Container()
                                                .Text(doc.Division)
                                                .FontSize(10)
                                                .FontColor(Colors.Grey.Darken1);
                                            foreach (var patient in doc.ReportPatients ?? Array.Empty<ReportPatient>())
                                            {
                                                c.Item().Container().Height(25);
                                                c.Item().Row(
                                                    qwe =>
                                                    {
                                                        qwe.RelativeItem().Container().Text(
                                                                $"{patient.LastName} {patient.FirstName} {patient.MiddleName}")
                                                            .FontSize(16);
                                                        if (patient.Rate == 1)
                                                            qwe.RelativeItem().AlignCenter().Container()
                                                                .Background(Colors.Green.Darken1)
                                                                .BorderColor(Colors.Green.Darken1).PaddingLeft(10)
                                                                .PaddingRight(10).Text($"Верные указания")
                                                                .FontColor(Colors.White).FontSize(16);
                                                        if (patient.Rate >= 2)
                                                            qwe.RelativeItem().AlignCenter().Container()
                                                                .Background(Colors.Red.Darken1)
                                                                .BorderColor(Colors.Red.Darken1).PaddingLeft(10)
                                                                .PaddingRight(10).Text($"Есть замечания")
                                                                .FontColor(Colors.White).FontSize(16);
                                                        if (patient.Rate is null)
                                                            qwe.RelativeItem().AlignCenter().Container()
                                                                .Background(Colors.Grey.Darken1)
                                                                .BorderColor(Colors.Grey.Darken1).PaddingLeft(10)
                                                                .PaddingRight(10).Text($"Не определенно")
                                                                .FontColor(Colors.White).FontSize(16);
                                                        qwe.RelativeItem().Container().Text($"").FontSize(16);
                                                    });
                                                c.Item().Container().Text($"Диагноз: {patient.Diagnosis}").FontSize(10);
                                                c.Item().Container().Height(10);
                                                c.Item().Table(
                                                    table =>
                                                    {
                                                        table.ColumnsDefinition(
                                                            q =>
                                                            {
                                                                q.RelativeColumn(10);
                                                                q.RelativeColumn(1);
                                                                q.RelativeColumn(3);
                                                            });
                                                        foreach (var appoint in patient.ReportAppointments
                                                                 ?? Array.Empty<ReportAppointment>())
                                                        {
                                                            table.Cell().Border(1).BorderColor(Colors.Grey.Lighten1)
                                                                .PaddingLeft(5).AlignMiddle().Text(appoint.Name);
                                                            table.Cell();
                                                            if (appoint.AppointmentState == AppointmentState.Unset)
                                                                table.Cell().Background(Colors.Red.Darken1)
                                                                    .BorderColor(Colors.Red.Darken1).AlignMiddle()
                                                                    .Container().AlignCenter().Text("Не назначенно")
                                                                    .FontColor(Colors.White);
                                                            if (appoint.AppointmentState == AppointmentState.Set)
                                                                table.Cell().Background(Colors.Green.Darken1)
                                                                    .BorderColor(Colors.Green.Darken1).AlignMiddle()
                                                                    .Container().AlignCenter().Text("Назначенно")
                                                                    .FontColor(Colors.White);
                                                            if (appoint.AppointmentState == AppointmentState.Additional)
                                                                table.Cell().Background(Colors.Orange.Darken1)
                                                                    .BorderColor(Colors.Orange.Darken1).AlignMiddle()
                                                                    .Container().AlignCenter()
                                                                    .Text("Дополнительнительное назначение")
                                                                    .FontColor(Colors.White);
                                                            if (appoint.AppointmentState == null)
                                                                table.Cell().Background(Colors.Grey.Darken1)
                                                                    .BorderColor(Colors.Grey.Darken1).AlignMiddle()
                                                                    .Container().AlignCenter()
                                                                    .Text("Не определенно")
                                                                    .FontColor(Colors.White);
                                                        }
                                                    });
                                            }
                                        });
                                if (_report.ReportDocs!.Last() != doc)
                                    col.Item().PageBreak();
                            }
                        });
            });
}
