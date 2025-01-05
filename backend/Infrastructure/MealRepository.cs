using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class MealRepository : Repository<Meal>, IMealRepository
    {
        public MealRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Meals)
        {}
        public new List<Meal> GetList(Func<Meal, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Meals
                    .Include(thread => thread.Group)
                    .ToList();
            return _appDbContext.Meals
                .Include(thread => thread.Group)
                .Where(predicate)
                .ToList();
        }
    }
}
