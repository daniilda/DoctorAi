namespace DoctorAi.API;

public class CephOptions
{
    public string S3Address => Environment.GetEnvironmentVariable("S3_ADDRESS") ?? string.Empty;

    public string BucketName => Environment.GetEnvironmentVariable("S3_BUCKET") ?? string.Empty;

    public string AccessKey => Environment.GetEnvironmentVariable("S3_ACCESS") ?? string.Empty;

    public string SecretKey => Environment.GetEnvironmentVariable("S3_SECRET") ?? string.Empty;
}
