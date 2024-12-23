using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public abstract class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly AppDbContext _appDbContext;
        private readonly DbSet<T> _dbSet;

        public Repository(AppDbContext appDbContext, DbSet<T> dbSet)
        {
            _appDbContext = appDbContext;
            _dbSet = dbSet;
        }

        public async Task SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }

        public T? Get(int id)
        {
            return _dbSet.FirstOrDefault(x => x.Id == id);
        }

        public List<T> GetList(Func<T, bool> predicate = null)
        {
            if (predicate == null)
                return _dbSet.ToList();
            return _dbSet.Where(predicate).ToList();
        }

        public void Add(T entity)
        {
            _appDbContext.Add(entity);
        }

        public void Delete(T entity)
        {
            _appDbContext.Remove(entity);
        }
    }
}
