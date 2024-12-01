namespace Domain.Interfaces
{
    public interface IDeleteRepository<T> : IRepository<T> where T : Entity
    {
        void Delete(T entity);
    }
}
