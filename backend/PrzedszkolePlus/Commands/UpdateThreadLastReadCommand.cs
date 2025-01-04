using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class UpdateThreadLastReadCommand : IRequest<Unit>
    {
        public int ThreadId { get; set; }
    }
}