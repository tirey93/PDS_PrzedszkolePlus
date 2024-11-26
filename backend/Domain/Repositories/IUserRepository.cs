
using Domain.Interfaces;

namespace Domain.Repositories
{
    public interface IUserRepository : IGetRepository<User>, IAddRepository<User>, IDeleteRepository<User>
    {
    }
}
