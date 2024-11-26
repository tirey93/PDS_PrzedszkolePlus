namespace PrzedszkolePlus.Response
{
    public class ReservationResponse
    {

        public int Id { get;  set; }
        public int ActivityId { get; set; }
        public int UserId { get; set; }
        public int? Duration { get; set; }
        public DateTime StartTime { get; set; }
        public string LeaderName { get; set; }
        public string ActivityName { get; set; }
        public string UserDisplayName { get; set; }
    }
}