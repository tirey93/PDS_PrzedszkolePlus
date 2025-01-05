using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class CreateThreadCommand : IRequest<Unit>
    {
        public int ParentId { get; set; }
        public int CaregiverId { get; set; }
        public string Subject { get; set; }
    }
}
