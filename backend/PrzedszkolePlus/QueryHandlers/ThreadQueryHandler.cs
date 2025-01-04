using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Response;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.QueryHandlers
{
    public class ThreadQueryHandler : IRequestHandler<GetThreadByLoggedUserQuery, IEnumerable<ThreadResponse>>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ThreadQueryHandler(IGroupRepository groupRepository, IHttpContextAccessor httpContextAccessor)
        {
            _groupRepository = groupRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<IEnumerable<ThreadResponse>> Handle(GetThreadByLoggedUserQuery request, CancellationToken cancellationToken)
        {
            //InvalidCookieException
            throw new NotImplementedException();
        }
    }
}
