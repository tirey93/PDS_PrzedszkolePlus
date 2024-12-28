using Domain.Properties;

namespace Domain.Exceptions
{
    public class GroupAlreadyExistsException : DomainException
    {
        public GroupAlreadyExistsException(string groupName) : base(string.Format(Resource.ExceptionGroupAlreadyExists, groupName)) 
        {
        }
    }
}
