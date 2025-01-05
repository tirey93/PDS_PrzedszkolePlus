using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserNotAllowedInThreadException : DomainException
    {
        public UserNotAllowedInThreadException(int threadId) : base(string.Format(Resource.ExceptionUserNotAllowedInThread, threadId)) 
        {
        }
    }
}
