namespace Domain.Interfaces
{
    public interface IRepository<T> where T : Entity
    {
        Task SaveChangesAsync();
    }
}