using MediatR;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Queries
{
    public class GetChildrenByGroupQuery : IRequest<IEnumerable<ChildResponse>>
    {
        public int GroupId { get; set; }
    }
}