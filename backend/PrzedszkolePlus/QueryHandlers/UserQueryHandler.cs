using Domain;
using Domain.Exceptions;
using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Response;
using MediatR;

namespace PrzedszkolePlus.QueryHandlers
{
    public class UserQueryHandler : IRequestHandler<CheckUsernameAvailabilityQuery, bool>,
                                    IRequestHandler<GetUserQuery, UserResponse>,
                                    IRequestHandler<GetAllUsersQuery, IEnumerable<UserResponse>>
    {
        private readonly IRepository _repository;

        public UserQueryHandler(IRepository repository)
        {
            _repository = repository;
        }

        public Task<bool> Handle(CheckUsernameAvailabilityQuery request, CancellationToken cancellationToken)
        {
            var username = request.Username.ToLower();

            var existingUsers = _repository.GetUsers(u => u.Name.ToLower() == username);
            if (existingUsers == null || !existingUsers.Any())
                return Task.FromResult(true);

            return Task.FromResult(false);
        }

        public Task<UserResponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUser(request.UserId)
                ?? throw new UserNotFoundException(request.UserId);

            var result = new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                DisplayName = user.DisplayName,
                Role = user.Role.ToString(),
            };
            return Task.FromResult(result);
        }

        public Task<IEnumerable<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            var users = _repository.GetUsers();

            if (users == null)
            {
                return Task.FromResult(Enumerable.Empty<UserResponse>());
            }

            var result = users.Select(x => new UserResponse
            {
                Id = x.Id,
                Name = x.Name,
                DisplayName = x.DisplayName,
                Role = x.Role.ToString(),
            });

            return Task.FromResult(result);
        }
    }
}
