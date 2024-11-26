
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services, string filename)
        {
            services.AddDbContext<AppDbContext>(options => options.UseSqlite(filename));
            services.AddScoped<IRepository, Repository>();
        }
    }
}
