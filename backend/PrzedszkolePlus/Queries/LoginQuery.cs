using PrzedszkolePlus.Response;
using MediatR;

namespace PrzedszkolePlus.Queries
{
    public class LoginQuery : IRequest<UserResponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
