using PrzedszkolePlus.Response;
using MediatR;

namespace PrzedszkolePlus.Queries
{
    public class GetUsersByRoleQuery : IRequest<IEnumerable<UserResponse>>
    {
        public string UserRole { get; set; }
    }
}
