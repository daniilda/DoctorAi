using System.Text.Json.Serialization;

namespace DoctorAi.API;

public class MlRequest
{
    [JsonPropertyName("doctors_ids")]
    public Guid[] DoctorsIds { get; init; } = Array.Empty<Guid>();

    [JsonPropertyName("doctors_to_client")]
    public Dictionary<Guid, Guid> DoctorsToClients { get; init; } = null!;

    [JsonPropertyName("clients")]
    public Dictionary<Guid, Client> Clients  { get; init; } = null!;
}

public class MLResponse
{
    [JsonPropertyName("ouput_rates")]
    public Dictionary<Guid, float> Rates { get; init; } = null!;

    [JsonPropertyName("referrals_info")]
    public Dictionary<Guid, CalcClient> ReferralsInfo { get; init; } = null!;
}

public class CalcClient
{
    [JsonPropertyName("1")]
    public string[] Goods { get; init; } = Array.Empty<string>();

    [JsonPropertyName("2")]
    public string[] Bads { get; init; } = Array.Empty<string>();

    [JsonPropertyName("3")]
    public string[] Excessive { get; init; } = Array.Empty<string>();
}

public class Client
{
    [JsonPropertyName("desease")]
    public string Diagnosis { get; init; } = null!;

    [JsonPropertyName("referrals")]
    public Ref Ref { get; init; } = null!;
}

public class Ref
{
    [JsonPropertyName("По показанию")]
    public string[] ByPoc { get; init; } = Array.Empty<string>();

    [JsonPropertyName("Обязательно")]
    public string[] Needed { get; init; } = Array.Empty<string>();
}
