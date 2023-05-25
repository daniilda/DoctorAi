using LinqToDB.Mapping;

namespace DoctorAi.API.Dtos;

public class User
{
    public Guid Id { get; init; }

    public string Username { get; init; } = null!;

    public string FirstName { get; init; } = null!;

    public string MiddleName { get; init; } = null!;

    public string LastName { get; init; } = null!;

    public string Position { get; init; } = null!;

    public string PicUrl { get; init; } = null!;
}

[Table("users")]
public class UserDb
{
    [PrimaryKey]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("username")]
    public string Username { get; set; } = null!;

    [Column("password")]
    public string Password { get; set; } = null!;

    [Column("first_name")]
    public string FirstName { get; set; } = null!;

    [Column("middle_name")]
    public string MiddleName { get; set; } = null!;

    [Column("last_name")]
    public string LastName { get; set; } = null!;

    [Column("position")]
    public string Position { get; set; } = null!;

    [Column("pic_url")]
    public string PicUrl { get; set; } = null!;
}
