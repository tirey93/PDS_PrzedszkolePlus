using Domain.Properties;

namespace Domain.Exceptions
{
    public class ThreadNotFoundException : DomainException
    {
        public ThreadNotFoundException(int threadId) : base(string.Format(Resource.ExceptionThreadNotFound, threadId)) 
        {
        }
    }
}
