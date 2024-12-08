using Domain;
using Domain.Repositories;

namespace Infrastructure
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Users)
        {
        }
    }
}
