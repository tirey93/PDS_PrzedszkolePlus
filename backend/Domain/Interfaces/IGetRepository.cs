namespace Domain.Interfaces
{
    public interface IGetRepository<T> : IRepository<T> where T : Entity
    {
        T Get(int id);
        List<T> GetList(Func<T, bool> predicate = null);
    }
}
