using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserAlreadyExistsException : DomainException
    {
        public UserAlreadyExistsException(string userName) : base(string.Format(Resource.ExceptionUserAlreadyExists, userName)) 
        {
        }
    }
}
