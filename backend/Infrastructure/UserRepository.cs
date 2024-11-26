using Domain;
using Domain.Repositories;

namespace Infrastructure
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }

        public User Get(int id)
        {
            return _appDbContext.Users.First(x => x.Id == id);
        }

        public List<User> GetList(Func<User, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Users.ToList();
            return _appDbContext.Users.Where(predicate).ToList();
        }

        public void Add(User entity)
        {
            _appDbContext.Add(entity);
        }

        public void Delete(User entity)
        {
            _appDbContext.Remove(entity);
        }
    }
}
