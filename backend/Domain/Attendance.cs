namespace Domain
{
    public class Attendance : Entity
    {
        public Child Child { get; set; }
        public DateOnly Date { get; set; }
        public bool Status { get; set; }
    }
}
