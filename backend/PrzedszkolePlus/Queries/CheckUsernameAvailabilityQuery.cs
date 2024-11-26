using MediatR;
namespace PrzedszkolePlus.Queries
{
    public class CheckUsernameAvailabilityQuery : IRequest<bool>
    {
        public string Username { get; set; }
    }
}
