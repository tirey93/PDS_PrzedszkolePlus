using PrzedszkolePlus.Response;
using MediatR;

namespace PrzedszkolePlus.Queries
{
    public class GetAllAnnouncementsQuery : IRequest<IEnumerable<AnnouncementResponse>>
    {
    }
}
