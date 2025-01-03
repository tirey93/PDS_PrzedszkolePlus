using MediatR;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Queries
{
    public class GetAttendancesByGroupQuery : IRequest<IEnumerable<AttendanceResponse>>
    {
        public int GroupId { get; set; }
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
    }
}