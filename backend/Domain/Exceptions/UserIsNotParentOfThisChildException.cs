using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserIsNotParentOfThisChildException : DomainException
    {
        public UserIsNotParentOfThisChildException(int userId, int childId) : base(string.Format(Resource.ExceptionUserIsNotParentOfThisChild, userId, childId))
        {
        }
    }
}
