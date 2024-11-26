using Domain.Properties;

namespace Domain.Exceptions
{
    public class PasswordNotMatchException : DomainException
    {
        public PasswordNotMatchException(string username) : base(string.Format(Resource.ExceptionUserPasswordNotMatch, username)) 
        {
        }
    }
}
