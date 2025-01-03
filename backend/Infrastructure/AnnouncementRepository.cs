using Domain;
using Domain.Repositories;

namespace Infrastructure
{
    public class AnnouncementRepository : Repository<Announcement>, IAnnouncementRepository
    {
        public AnnouncementRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Announcements)
        {
        }
    }
}
