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
                                     IRequestHandler<GetChildrenByParentQuery, IEnumerable<ChildResponse>>
    {
        private readonly IChildRepository _childRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ChildQueryHandler(IChildRepository childRepository, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _childRepository = childRepository;
            _userRepository = userRepository;
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

        public Task<IEnumerable<ChildResponse>> Handle(GetChildrenByParentQuery request, CancellationToken cancellationToken)
        {
            var parent = _userRepository.Get(request.ParentId)
                ?? throw new UserNotFoundException(request.ParentId);

            var children = _childRepository.GetList(x => x.Parent.Id == request.ParentId);

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
