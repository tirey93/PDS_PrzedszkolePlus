using Domain;

namespace Infrastructure
{
    public class Repository : IRepository
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public List<User> GetUsers(Func<User, bool>? predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Users.ToList();
            return _appDbContext.Users.Where(predicate).ToList();
        }
        public User? GetUser(int id)
        {
            return _appDbContext.Users.FirstOrDefault(x => x.Id == id);
        }
        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }
        public async Task SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }
    }
}
