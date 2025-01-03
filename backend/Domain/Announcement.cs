
namespace Domain
{
    public class Announcement : Entity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string? FilePath { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
