using Domain.Properties;

namespace Domain.Exceptions
{
    public class ChildNotFoundException : DomainException
    {
        public ChildNotFoundException(int childId) : base(string.Format(Resource.ExceptionChildNotFound, childId)) 
        {
        }
    }
}
