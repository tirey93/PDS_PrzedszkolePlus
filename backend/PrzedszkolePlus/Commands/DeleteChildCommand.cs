using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class DeleteChildCommand : IRequest<Unit>
    {
        public int ChildId { get; set; }
    }
}
