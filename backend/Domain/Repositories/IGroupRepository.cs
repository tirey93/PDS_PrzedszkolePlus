namespace Domain.Repositories
{
    public interface IGroupRepository : IRepository<Group>
    {
        new Group Get(int id);
        new List<Group> GetList(Func<Group, bool> predicate = null);
    }
}
