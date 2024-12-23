using MediatR;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Queries
{
    public class GetChildrenByLoggedUserQuery : IRequest<IEnumerable<ChildResponse>>
    {
    }
}