using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class AttendanceRepository : Repository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Attendances)
        {
        }

        public new List<Attendance> GetList(Func<Attendance, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Attendances.ToList();
            return _appDbContext.Attendances
                .Include(attendance => attendance.Child)
                .Include(attendance => attendance.Child.Group)
                .Include(attendance => attendance.Child.Parent)
                .Where(predicate)
                .ToList();
        }
    }
}
