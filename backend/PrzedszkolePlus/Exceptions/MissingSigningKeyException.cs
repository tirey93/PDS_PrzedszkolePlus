using PrzedszkolePlus.Properties;

namespace PrzedszkolePlus.Exceptions
{
    public class MissingSigningKeyException : Exception
    {
        public MissingSigningKeyException() : base(Resource.ExceptionSigningKeyIsMissing)
        {
        }
    }
}
