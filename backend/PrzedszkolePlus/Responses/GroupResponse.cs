namespace PrzedszkolePlus.Response
{
    public class GroupResponse
    {
        public int Id { get;  set; }
        public string Name { get; set; }
        public int CaregiverId { get; set; }
        public DateOnly CreatedAt { get; set; }
    }
}