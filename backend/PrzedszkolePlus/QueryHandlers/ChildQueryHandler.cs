using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Response;
using PrzedszkolePlus.Utils;
using MediatR;
using Domain.Repositories;
using PrzedszkolePlus.Constants;
using PrzedszkolePlus.Exceptions;
using Domain.Exceptions;

namespace PrzedszkolePlus.QueryHandlers
{
    public class ChildQueryHandler : IRequestHandler<GetChildrenByLoggedUserQuery, IEnumerable<ChildResponse>>,
                                     IRequestHandler<GetChildrenByGroupQuery, IEnumerable<ChildResponse>>
    {
        private readonly IChildRepository _childRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ChildQueryHandler(IChildRepository childRepository, IGroupRepository groupRepository, IHttpContextAccessor httpContextAccessor)
        {
            _childRepository = childRepository;
            _groupRepository = groupRepository;
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

        public Task<IEnumerable<ChildResponse>> Handle(GetChildrenByGroupQuery request, CancellationToken cancellationToken)
        {
            var group = _groupRepository.Get(request.GroupId)
                ?? throw new GroupNotFoundException(request.GroupId);

            var children = _childRepository.GetList(x => x.Group.Id == request.GroupId);

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
