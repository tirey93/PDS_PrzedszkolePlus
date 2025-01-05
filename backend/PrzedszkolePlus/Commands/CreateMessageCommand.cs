using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class CreateMessageCommand : IRequest<Unit>
    {
        public int ThreadId { get; set; }
        public string Content { get; set; }
    }
}
