using PrzedszkolePlus.Response;
using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class RegisterCommand : IRequest<UserResponse>
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
    }
}
