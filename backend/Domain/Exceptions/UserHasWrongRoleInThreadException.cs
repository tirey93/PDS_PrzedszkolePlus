using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserHasWrongRoleInThreadException : DomainException
    {
        public UserHasWrongRoleInThreadException(string desiredRole, int userId) : base(string.Format(Resource.ExceptionUserHasWrongRoleInThread, desiredRole, userId)) 
        {
        }
    }
}
