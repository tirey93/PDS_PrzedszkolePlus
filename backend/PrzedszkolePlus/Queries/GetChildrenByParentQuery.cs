using MediatR;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Queries
{
    public class GetChildrenByParentQuery : IRequest<IEnumerable<ChildResponse>>
    {
        public int ParentId { get; set; }
    }
}