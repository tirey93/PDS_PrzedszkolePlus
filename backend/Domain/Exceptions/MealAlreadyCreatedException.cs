using Domain.Properties;

namespace Domain.Exceptions
{
    public class MealAlreadyCreatedException : DomainException
    {
        public MealAlreadyCreatedException(DateOnly date, int groupId) : base(string.Format(Resource.ExceptionMealAlreadyCreated, date.ToString(), groupId)) 
        {
        }

    }
}
