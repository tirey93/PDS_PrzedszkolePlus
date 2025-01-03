using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Response;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;

namespace PrzedszkolePlus.QueryHandlers
{
    public class AttendanceQueryHandler : IRequestHandler<GetAttendancesByGroupQuery, IEnumerable<AttendanceResponse>>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IAttendanceRepository _attendanceRepository;

        public AttendanceQueryHandler(IGroupRepository groupRepository, IAttendanceRepository attendanceRepository)
        {
            _groupRepository = groupRepository;
            _attendanceRepository = attendanceRepository;
        }

        public Task<IEnumerable<AttendanceResponse>> Handle(GetAttendancesByGroupQuery request, CancellationToken cancellationToken)
        {
            var group = _groupRepository.Get(request.GroupId)
                ?? throw new GroupNotFoundException(request.GroupId);

            var attendances = _attendanceRepository.GetList(x => x.Child.Group.Id == request.GroupId &&
                                                                 x.Date >= request.DateFrom &&
                                                                 x.Date <= request.DateTo);

            if (attendances == null || !attendances.Any())
            {
                return Task.FromResult(Enumerable.Empty<AttendanceResponse>());
            }

            var result = attendances.Select(x => new AttendanceResponse
            {
                Id = x.Id,
                ChildId = x.Child.Id,
                Date = x.Date,
                Status = x.Status,
            });

            return Task.FromResult(result);
        }
    }
}
