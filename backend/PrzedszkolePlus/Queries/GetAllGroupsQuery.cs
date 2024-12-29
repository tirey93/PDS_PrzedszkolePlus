using PrzedszkolePlus.Response;
using MediatR;

namespace PrzedszkolePlus.Queries
{
    public class GetAllGroupsQuery : IRequest<IEnumerable<GroupResponse>>
    {
    }
}
