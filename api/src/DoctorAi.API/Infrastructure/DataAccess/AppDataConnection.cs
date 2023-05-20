using LinqToDB;
using LinqToDB.Data;

namespace DoctorAi.API.Infrastructure.DataAccess;

public sealed class AppDataConnection : DataConnection
{
    public AppDataConnection(DataOptions<AppDataConnection> options) : base(options.Options)
    {
    }
}
