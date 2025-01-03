namespace PrzedszkolePlus.Requests
{
    public class ThreadRequest
    {
        public int ParentId { get; set; }
        public int CaregiverId { get; set; }
        public string Subject { get; set; }
        public DateTime ParentLastRead { get; set; }
        public DateTime CaregiverLastRead { get; set; }
    }
}