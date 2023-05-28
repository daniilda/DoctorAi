using DoctorAi.API.Dtos;
using LinqToDB;
using LinqToDB.Data;

namespace DoctorAi.API.Infrastructure.DataAccess;

public sealed class AppDataConnection : DataConnection
{
    public AppDataConnection(DataOptions<AppDataConnection> options) : base(options.Options)
    {
    }

    public ITable<UserDb> Users => this.GetTable<UserDb>();

    public ITable<ReportDb> Reports => this.GetTable<ReportDb>();

    public ITable<ReportDocDb> Docs => this.GetTable<ReportDocDb>();

    public ITable<ReportPatientDb> Patients => this.GetTable<ReportPatientDb>();

    public ITable<ReportAppointmentDb> Appointments => this.GetTable<ReportAppointmentDb>();

    public ITable<ReportLinkDb> Links => this.GetTable<ReportLinkDb>();
}
