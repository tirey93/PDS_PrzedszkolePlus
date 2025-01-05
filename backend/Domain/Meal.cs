
namespace Domain
{
    public class Meal : Entity
    {
        public Group Group { get; set; }
        public DateOnly Date { get; set; }
        public string Breakfast { get; set; }
        public string Lunch { get; set; }
        public string Dinner { get; set; }
    }
}
