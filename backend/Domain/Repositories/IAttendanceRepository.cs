namespace Domain.Repositories
{
    public interface IAttendanceRepository : IRepository<Attendance>
    {
        Attendance? FirstOrDefault(Func<Attendance, bool> predicate = null);
    }
}
