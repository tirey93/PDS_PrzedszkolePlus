using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class DeleteUserCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
    }
}
