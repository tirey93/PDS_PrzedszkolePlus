using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserIsNotCaregiverException : DomainException
    {
        public UserIsNotCaregiverException(int userId) : base(string.Format(Resource.ExceptionUserIsNotCaregiver, userId))
        {
        }
    }
}
