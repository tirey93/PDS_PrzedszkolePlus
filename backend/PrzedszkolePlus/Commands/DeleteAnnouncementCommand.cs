using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class DeleteAnnouncementCommand : IRequest<Unit>
    {
        public int AnnouncementId { get; set; }
    }
}
