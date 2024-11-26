using Domain;
using Domain.Interfaces;

namespace Infrastructure
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        async Task IRepository<T>.SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }
    }
}
