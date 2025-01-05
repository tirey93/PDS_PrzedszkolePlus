using MediatR;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Queries
{
    public class GetThreadByLoggedUserQuery : IRequest<IEnumerable<ThreadResponse>>
    {
    }
}