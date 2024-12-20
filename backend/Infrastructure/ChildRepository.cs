using Domain;
using Domain.Repositories;

namespace Infrastructure
{
    public class ChildRepository : Repository<Child>, IChildRepository
    {
        public ChildRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Children)
        {
        }
    }
}
