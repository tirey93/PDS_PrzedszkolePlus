using PrzedszkolePlus.Properties;

namespace PrzedszkolePlus.Exceptions
{
    public class InvalidUserIdException : Exception
    {
        public InvalidUserIdException() : base(Resource.ExceptionUserIdIsInvalid)
        {
        }
    }
}
