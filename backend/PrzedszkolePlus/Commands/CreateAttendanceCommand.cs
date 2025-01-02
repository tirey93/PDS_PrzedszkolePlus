using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class CreateAttendanceCommand : IRequest<Unit>
    {
        public int ChildId { get; set; }
        public DateOnly Date { get; set; }
        public bool Status { get; set; }
    }
}
