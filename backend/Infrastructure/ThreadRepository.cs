using Domain.Repositories;

namespace Infrastructure
{
    public class ThreadRepository : Repository<Domain.Thread>, IThreadRepository
    {
        public ThreadRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Threads)
        {
        }
    }
}
