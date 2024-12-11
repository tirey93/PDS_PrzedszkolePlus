using Domain;
using Domain.Exceptions;
using PrzedszkolePlus.Commands;
using PrzedszkolePlus.Response;
using PrzedszkolePlus.Utils;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.CommandHandlers
{
    public class AuthenticationCommandHandler
        : IRequestHandler<RegisterCommand, UserResponse>
    {
        private readonly IUserRepository _userRepository;

        public AuthenticationCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var userExists = _userRepository.GetList(x => x.Name == request.Username).FirstOrDefault();
            if (userExists != null)
                throw new UserAlreadyExistsException(request.Username);

            var hash = ShaHelper.QuickHash(request.Password);
            var user = new User 
            { 
                Name = request.Username,
                DisplayName = request.DisplayName,
                IsActive = true,
                HashedPassword = hash,
                Role = Role.User
            };
            _userRepository.Add(user);
            await _userRepository.SaveChangesAsync();

            return new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                DisplayName = user.DisplayName,
                IsActive = user.IsActive,
                Role = user.Role.ToString(),
            };
        }
    }
}
