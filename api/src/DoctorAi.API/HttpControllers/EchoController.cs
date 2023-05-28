using DoctorAi.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;

namespace DoctorAi.API.HttpControllers;

[ApiController]
[Route("api/v1/echo")]
public sealed class EchoController : ControllerBase
{
    [HttpGet]
    public ActionResult<string> Echo(string input)
    {
        var q = new ReportTemplate(new Report
        {
            Id = Guid.NewGuid(),
            CreatedAt = DateTime.Now,
            ReportName = "За февраль 2023, по Пономареву",
            Creator = new User
            {
                Position = "Глав. Врач",
                FirstName = "Имя",
                LastName = "Фамилия",
                MiddleName = "Отчество"
            },
            ReportDocs = new []
            {
                new ReportDoc
                {
                    FirstName = "Михаил",
                    LastName = "Зубенко",
                    MiddleName = "Петрович",
                    Rate = 89,
                    Division = "Кардиология",
                    Position = "Кардиолог",
                    ReportPatients = new []
                    {
                        new ReportPatient
                        {
                            FirstName = "Антон",
                            MiddleName = "Анатольевич",
                            LastName = "Денисов",
                            Diagnosis = "Рак яичек",
                            Rate = 1,
                            ReportAppointments = new[]
                            {
                                new ReportAppointment
                                {
                                    AppointmentState = AppointmentState.Set,
                                    Name = "Кастрация",
                                    Id = Guid.NewGuid()
                                },
                                new ReportAppointment
                                {
                                    AppointmentState = AppointmentState.Unset,
                                    Name = "Деградация",
                                    Id = Guid.NewGuid()
                                },
                                new ReportAppointment
                                {
                                    AppointmentState = AppointmentState.Additional,
                                    Name = "Пробирование",
                                    Id = Guid.NewGuid()
                                }
                            }

                        }
                    }
                },
                new ReportDoc
                {
                    FirstName = "Михаил",
                    LastName = "Зубенко",
                    MiddleName = "Петрович",
                    Rate = 89,
                    Division = "Кардиология",
                    Position = "Кардиолог",
                    ReportPatients = new []
                    {
                        new ReportPatient
                        {
                            FirstName = "Антон",
                            MiddleName = "Анатольевич",
                            LastName = "Денисов",
                            Diagnosis = "Рак яичек",
                            Rate = 1,
                            ReportAppointments = new[]
                            {
                                new ReportAppointment
                                {
                                    AppointmentState = AppointmentState.Set,
                                    Name = "Кастрация",
                                    Id = Guid.NewGuid()
                                },
                                new ReportAppointment
                                {
                                    AppointmentState = AppointmentState.Unset,
                                    Name = "Деградация",
                                    Id = Guid.NewGuid()
                                },
                                new ReportAppointment
                                {
                                    AppointmentState = AppointmentState.Additional,
                                    Name = "Пробирование",
                                    Id = Guid.NewGuid()
                                }
                            }

                        },
                        new ReportPatient
                        {
                            FirstName = "Антон",
                            MiddleName = "Анатольевич",
                            LastName = "Денисов",
                            Diagnosis = "Рак яичек",
                            Rate = 1,
                            ReportAppointments = new[]
                            {
                                new ReportAppointment
                                {
                                    AppointmentState = AppointmentState.Set,
                                    Name = "Кастрация",
                                    Id = Guid.NewGuid()
                                },
                                new ReportAppointment
                                {
                                    AppointmentState = AppointmentState.Unset,
                                    Name = "Деградация",
                                    Id = Guid.NewGuid()
                                },
                                new ReportAppointment
                                {
                                    AppointmentState = AppointmentState.Additional,
                                    Name = "Пробирование",
                                    Id = Guid.NewGuid()
                                }
                            }

                        }
                    }
                }
            }
        });
        q.GeneratePdfAndShow();
        return Ok(input);
    }
}
