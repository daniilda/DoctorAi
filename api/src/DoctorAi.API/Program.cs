using DoctorAi.API.Infrastructure.Authorization.Extensions;
using FluentMigrator.Runner;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
