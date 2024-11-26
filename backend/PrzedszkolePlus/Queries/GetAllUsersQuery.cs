using PrzedszkolePlus.Response;
using MediatR;

namespace PrzedszkolePlus.Queries
{
    public class GetAllUsersQuery : IRequest<IEnumerable<UserResponse>>
    {
    }
}
