using MediatR;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Queries
{
    public class GetAttendancesByLoggedUserChildrenQuery : IRequest<IEnumerable<AttendanceResponse>>
    {
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
    }
}