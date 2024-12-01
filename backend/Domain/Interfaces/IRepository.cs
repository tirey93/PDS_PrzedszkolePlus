namespace Domain.Interfaces
{
    public interface IRepository<T> where T : Entity
    {
        void Add(T entity);
        void Delete(T entity);
        T Get(int id);
        List<T> GetList(Func<T, bool> predicate = null);
        Task SaveChangesAsync();
    }
}