
namespace Domain
{
    public class Message : Entity
    {
        public string Content { get; set; }
        public User Sender { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
