using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Response;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.QueryHandlers
{
    public class GroupQueryHandler : IRequestHandler<GetAllGroupsQuery, IEnumerable<GroupResponse>>
    {
        private readonly IGroupRepository _groupRepository;

        public GroupQueryHandler(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        public Task<IEnumerable<GroupResponse>> Handle(GetAllGroupsQuery request, CancellationToken cancellationToken)
        {
            var groups = _groupRepository.GetList();

            if (groups == null)
            {
                return Task.FromResult(Enumerable.Empty<GroupResponse>());
            }

            var result = groups.Select(x => new GroupResponse
            {
                Id = x.Id,
                Name = x.Name,
                CaregiverId = x.Caregiver.Id,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }
    }
}
