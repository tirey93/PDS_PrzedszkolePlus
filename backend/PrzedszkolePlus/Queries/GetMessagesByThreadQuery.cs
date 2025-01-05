using MediatR;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Queries
{
    public class GetMessagesByThreadQuery : IRequest<IEnumerable<MessageResponse>>
    {
        public int ThreadId { get; set; }
    }
}