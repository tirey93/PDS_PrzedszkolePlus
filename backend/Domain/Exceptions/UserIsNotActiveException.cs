using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserIsNotActiveException : DomainException
    {
        public UserIsNotActiveException(int userId) : base(string.Format(Resource.ExceptionUserIsNotActive, userId))
        {
        }
    }
}
