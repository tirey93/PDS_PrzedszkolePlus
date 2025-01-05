
namespace Domain
{
    public class Child : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public User Parent { get; set; }
        public Group Group { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Attendance> Attendances { get; set; }
    }
}
