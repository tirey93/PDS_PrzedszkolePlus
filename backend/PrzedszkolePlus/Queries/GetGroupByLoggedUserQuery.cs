using MediatR;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Queries
{
    public class GetGroupByLoggedUserQuery : IRequest<IEnumerable<GroupResponse>>
    {
    }
}