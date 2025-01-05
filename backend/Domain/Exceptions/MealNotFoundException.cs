using Domain.Properties;

namespace Domain.Exceptions
{
    public class MealNotFoundException : DomainException
    {
        public MealNotFoundException(int mealId) : base(string.Format(Resource.ExceptionMealNotFound, mealId)) 
        {
        }

    }
}
