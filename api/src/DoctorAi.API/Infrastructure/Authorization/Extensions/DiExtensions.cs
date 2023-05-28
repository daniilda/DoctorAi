using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace DoctorAi.API.Infrastructure.Authorization.Extensions;

public static class DiExtensions
{
    public static IServiceCollection AddSimpleAuthorization(this IServiceCollection services)
        => services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = false,
                    IssuerSigningKey = new SymmetricSecurityKey(new byte[128]),
                    ClockSkew = TimeSpan.Zero
                };
            }).Services;
}
