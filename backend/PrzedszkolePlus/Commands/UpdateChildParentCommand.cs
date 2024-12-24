using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class UpdateChildParentCommand : IRequest<Unit>
    {
        public int ChildId { get; set; }
        public int NewParentId { get; set; }
    }
}
