
namespace Domain
{
    public class Group : Entity
    {
        public string Name { get; set; }
        public User Caregiver { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
