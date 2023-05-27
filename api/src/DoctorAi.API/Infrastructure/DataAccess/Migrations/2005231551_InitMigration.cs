using FluentMigrator;

namespace DoctorAi.API.Infrastructure.DataAccess.Migrations;

[Migration(2005231551)]
public sealed class InitMigration : Migration
{
    public override void Up()
    {
        Create
            .Table("users")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("username").AsString().Unique()
            .WithColumn("password").AsString()
            .WithColumn("first_name").AsString()
            .WithColumn("middle_name").AsString()
            .WithColumn("last_name").AsString()
            .WithColumn("position").AsString()
            .WithColumn("pic_url").AsString();

        Create
            .Table("reports")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("report_name").AsString().Indexed()
            .WithColumn("created_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("creator_id").AsGuid().Indexed()
            .WithColumn("is_ready").AsBoolean().WithDefaultValue(false)
            .WithColumn("pdf_url").AsString().Nullable()
            .WithColumn("docx_url").AsString().Nullable();

        Create
            .Table("reports_patient")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("first_name").AsString()
            .WithColumn("middle_name").AsString()
            .WithColumn("last_name").AsString()
            .WithColumn("date_of_birth").AsDate()
            .WithColumn("code").AsString()
            .WithColumn("sex").AsString()
            .WithColumn("diagnosis").AsString()
            .WithColumn("pdf_url").AsString().Nullable()
            .WithColumn("docx_url").AsString().Nullable();

        Create
            .Table("reports_doc")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("first_name").AsString()
            .WithColumn("middle_name").AsString()
            .WithColumn("last_name").AsString()
            .WithColumn("position").AsString().Indexed()
            .WithColumn("division").AsString().Indexed()
            .WithColumn("rate").AsInt32().Nullable()
            .WithColumn("pdf_url").AsString()
            .WithColumn("docx_url").AsString();

        Create
            .Table("reports_appointment")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("name").AsString()
            .WithColumn("state").AsInt32().Nullable();

        Create
            .Table("reports_link")
            .WithColumn("report_id").AsGuid().Indexed()
            .WithColumn("report_doc_od").AsGuid().Indexed()
            .WithColumn("report_patient_id").AsGuid().Indexed()
            .WithColumn("report_appointment_id").AsGuid().Indexed();

    }

        public override void Down()
        => throw new NotImplementedException();
}
