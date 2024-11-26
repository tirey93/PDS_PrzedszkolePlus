namespace Domain.Exceptions
{
    public class AuthenticationFailureException : DomainException
    {
        public AuthenticationFailureException(string message) : base(message) 
        {
        }
    }
}
