using Domain;
using Domain.Repositories;

namespace Infrastructure
{
    public class GroupRepository : Repository<Group>, IGroupRepository
    {
        public GroupRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Groups)
        {
        }
    }
}
