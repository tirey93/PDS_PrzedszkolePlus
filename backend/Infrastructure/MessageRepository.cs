using Domain;
using Domain.Repositories;

namespace Infrastructure
{
    public class MessageRepository : Repository<Message>, IMessageRepository
    {
        public MessageRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Messages)
        {
        }
    }
}
