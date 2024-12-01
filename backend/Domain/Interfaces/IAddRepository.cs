namespace Domain.Interfaces
{
    public interface IAddRepository<T> : IRepository<T> where T : Entity
    {
        void Add(T entity);
    }
}
