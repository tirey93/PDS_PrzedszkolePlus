using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public Role Role { get; set; }
        public string HashedPassword { get; set; }
    }
}
