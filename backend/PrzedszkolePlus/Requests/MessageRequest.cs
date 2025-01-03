namespace PrzedszkolePlus.Requests
{
    public class MessageRequest
    {
        public int SenderId { get; set; }
        public int ThreadId { get; set; }
        public string Content { get; set; }
    }
}