namespace Domain.Repositories
{
    public interface IAttendanceRepository : IRepository<Attendance>
    {
        Attendance? Get(Func<Attendance, bool> predicate = null);
    }
}
