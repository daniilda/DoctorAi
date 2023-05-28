namespace DoctorAi.API.Dtos;

public class Direction
{
    public Guid Id { get; init; }

    public string Name { get; init; } = null!;

    public AppointmentState State { get; init; }
}
