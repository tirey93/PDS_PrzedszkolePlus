using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Response;
using PrzedszkolePlus.Utils;
using MediatR;
using Domain.Repositories;
using PrzedszkolePlus.Constants;
using PrzedszkolePlus.Exceptions;

namespace PrzedszkolePlus.QueryHandlers
{
    public class ChildQueryHandler : IRequestHandler<GetChildrenByLoggedUserQuery, IEnumerable<ChildResponse>>
    {
        private readonly IChildRepository _childRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ChildQueryHandler(IChildRepository childRepository, IHttpContextAccessor httpContextAccessor)
        {
            _childRepository = childRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<IEnumerable<ChildResponse>> Handle(GetChildrenByLoggedUserQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var children = _childRepository.GetList(x => x.Parent.Id == loggedUserId);
            
            if (children == null || !children.Any())
            {
                return Task.FromResult(Enumerable.Empty<ChildResponse>());
            }

            var result = children.Select(x => new ChildResponse
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                DateOfBirth = x.DateOfBirth,
                ParentId = x.Parent.Id,
                GroupId = x.Group.Id,
                CreatedAt = x.CreatedAt
            });
            
            return Task.FromResult(result);
        }
    }
}
