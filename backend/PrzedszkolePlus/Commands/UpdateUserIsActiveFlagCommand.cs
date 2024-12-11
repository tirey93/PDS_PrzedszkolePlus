using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class UpdateUserIsActiveFlagCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
        public bool NewIsActiveFlagValue { get; set; }
    }
}
