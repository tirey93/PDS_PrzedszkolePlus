
namespace Domain
{
    public interface IRepository
    {
        List<User> GetUsers(Func<User, bool> predicate = null);
        User GetUser(int id);
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task SaveChangesAsync();
    }
}