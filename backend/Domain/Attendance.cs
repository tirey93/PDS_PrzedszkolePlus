namespace Domain
{
    public class Attendance : Entity
    {
        public User Child { get; set; }
        public DateOnly Date { get; set; }
        public bool Status { get; set; }
    }
}
