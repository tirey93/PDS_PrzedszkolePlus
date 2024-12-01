using Domain;
using Domain.Exceptions;
using PrzedszkolePlus.Commands;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.CommandHandlers
{
    public class UserCommandHandler : IRequestHandler<UpdateUserRoleCommand, Unit>,
                                      IRequestHandler<DeleteUserCommand, Unit>
    {
        private readonly IUserRepository _repository;

        public UserCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.Get(request.UserId) 
                ?? throw new UserNotFoundException(request.UserId);

            user.Role = Enum.Parse<Role>(request.NewRole);
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }
        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.Get(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            _repository.Delete(user);
            await _repository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
