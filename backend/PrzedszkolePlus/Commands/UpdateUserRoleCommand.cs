using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class UpdateUserRoleCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
        public string NewRole { get; set; }
    }
}
