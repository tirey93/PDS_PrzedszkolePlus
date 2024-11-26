using Domain;
using Domain.Exceptions;
using PrzedszkolePlus.Commands;
using MediatR;

namespace PrzedszkolePlus.CommandHandlers
{
    public class UserCommandHandler : IRequestHandler<UpdateUserRoleCommand, Unit>,
                                      IRequestHandler<DeleteUserCommand, Unit>
    {
        private readonly IRepository _repository;

        public UserCommandHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId) 
                ?? throw new UserNotFoundException(request.UserId);

            user.Role = Enum.Parse<Role>(request.NewRole);
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }
        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            _repository.Delete(user);
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
