using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Infrastructure
{
    public class ThreadRepository : Repository<Domain.Thread>, IThreadRepository
    {
        public ThreadRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Threads)
        {}

        public new Domain.Thread? Get(int id)
        {
            return _appDbContext.Threads
                .Include(thread => thread.Caregiver)
                .Include(thread => thread.Parent)
                .Include(thread => thread.Messages)
                .FirstOrDefault(group => group.Id == id);
        }
    }
}
