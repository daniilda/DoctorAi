using System.Reflection;
using FluentMigrator.Runner;
using LinqToDB;

namespace DoctorAi.API.Infrastructure.DataAccess.Extensions;

public static class DiExtensions
{
    private const string EnvironmentConnectionStringVariable = "DAI_API_PG_CONNECTION";

    public static IServiceCollection AddLinq2DbAppConnection(this IServiceCollection services)
    {
        var dataOptions = new DataOptions().UsePostgreSQL(TryGetConnectionString());
        var concreteDataOptions = new DataOptions<AppDataConnection>(dataOptions);
        services.AddScoped<AppDataConnection>(sp => new AppDataConnection(concreteDataOptions));
        return services;
    }

    public static IServiceCollection AddMigrator(this IServiceCollection services, Assembly assembly)
        => services.AddFluentMigratorCore()
            .ConfigureRunner(
                x
                    => x.AddPostgres()
                        .WithGlobalConnectionString(TryGetConnectionString())
                        .ScanIn(assembly).For.Migrations())
            .AddLogging(y => y.AddFluentMigratorConsole());

    private static string TryGetConnectionString()
        => Environment.GetEnvironmentVariable(EnvironmentConnectionStringVariable)
           // ReSharper disable once NotResolvedInText
           ?? throw new ArgumentNullException("connectionString");
}
