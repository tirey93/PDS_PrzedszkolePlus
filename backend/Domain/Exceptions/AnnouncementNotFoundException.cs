using Domain.Properties;

namespace Domain.Exceptions
{
    public class AnnouncementNotFoundException : DomainException
    {
        public AnnouncementNotFoundException(int announcementId) : base(string.Format(Resource.ExceptionAnnouncementNotFound, announcementId)) 
        {
        }
    }
}
