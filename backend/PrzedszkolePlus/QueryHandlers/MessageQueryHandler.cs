using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Response;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.QueryHandlers
{
    public class MessageQueryHandler : IRequestHandler<GetMessagesByThreadQuery, IEnumerable<MessageResponse>>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MessageQueryHandler(IGroupRepository groupRepository, IHttpContextAccessor httpContextAccessor)
        {
            _groupRepository = groupRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<IEnumerable<MessageResponse>> Handle(GetMessagesByThreadQuery request, CancellationToken cancellationToken)
        {
            //ThreadNotFoundException
            throw new NotImplementedException();
        }
    }
}
