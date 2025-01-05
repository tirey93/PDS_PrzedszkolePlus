using Domain;
using Domain.Repositories;

namespace Infrastructure
{
    public class MealRepository : Repository<Meal>, IMealRepository
    {
        public MealRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Meals)
        {
        }
    }
}
