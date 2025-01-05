using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class DeleteMealCommand : IRequest<Unit>
    {
        public int MealId { get; set; }
    }
}
