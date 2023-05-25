using DoctorAi.API.Infrastructure.Authorization.Extensions;
using DoctorAi.API.Infrastructure.DataAccess.Extensions;
using DoctorAi.API.Infrastructure.DataAccess.Migrations;
using FluentMigrator.Runner;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddLinq2DbAppConnection();
builder.Services.AddMigrator(typeof(InitMigration).Assembly);
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

if (args.Contains("migrate"))
{
    await using var scope = app.Services.CreateAsyncScope();
    var runner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
    runner.ListMigrations();
    runner.MigrateUp();
    return;
}

await app.RunAsync();
