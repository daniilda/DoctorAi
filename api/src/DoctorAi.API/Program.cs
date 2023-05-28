using Amazon.Runtime;
using Amazon.S3;
using ClosedXML.Excel;
using ClosedXML.Graphics;
using DoctorAi.API;
using DoctorAi.API.Infrastructure.Authorization.Extensions;
using DoctorAi.API.Infrastructure.DataAccess.Extensions;
using DoctorAi.API.Infrastructure.DataAccess.Migrations;
using FluentMigrator.Runner;
using Microsoft.OpenApi.Models;
using QuestPDF.Infrastructure;

QuestPDF.Settings.License = LicenseType.Community;

var builder = WebApplication.CreateBuilder(args);
LoadOptions.DefaultGraphicEngine = new DefaultGraphicEngine("Arial");
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddLinq2DbAppConnection();
builder.Services.AddMigrator(typeof(InitMigration).Assembly);
builder.Services.AddSingleton<CephOptions>();
builder.Services.AddSwaggerGen(
    opt =>
    {
        opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please insert JWT with Bearer into field",
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
            BearerFormat = "JWT"
        });
        opt.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        });
    });
builder.Services.AddSimpleAuthorization();
builder.Services.AddHttpClient();
var cephOptions = new CephOptions();
var awsConfig = new AmazonS3Config
{
    ServiceURL = $"https://{cephOptions.S3Address}",
};

var awsClient = new AmazonS3Client(
    new BasicAWSCredentials(
        cephOptions.AccessKey,
        cephOptions.SecretKey),
    awsConfig);

builder.Services.AddSingleton<IAmazonS3>(awsClient);
builder.Services.AddHostedService<ReportProcessor>();
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.UseCors(cors
    =>
{
    cors.AllowAnyHeader();
    cors.AllowAnyOrigin();
    cors.AllowAnyMethod();
});

if (args.Contains("migrate") || Environment.GetEnvironmentVariable("AUTO_MIGRATE") == "true")
{
    await using var scope = app.Services.CreateAsyncScope();
    var runner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
    runner.ListMigrations();
    runner.MigrateUp();
    if (args.Contains("migrate"))
        return;
}

await app.RunAsync();
