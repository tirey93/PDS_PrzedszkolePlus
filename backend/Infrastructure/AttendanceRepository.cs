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
    }
}
