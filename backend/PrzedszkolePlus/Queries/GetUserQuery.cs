using PrzedszkolePlus.Response;
using MediatR;

namespace PrzedszkolePlus.Queries
{
    public class GetUserQuery : IRequest<UserResponse>
    {
        public int UserId { get; set; }
    }
}
