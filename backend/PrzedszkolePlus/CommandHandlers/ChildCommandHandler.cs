using Domain;
using Domain.Exceptions;
using PrzedszkolePlus.Commands;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.CommandHandlers
{
    public class ChildCommandHandler : IRequestHandler<CreateChildCommand, Unit>
    { 
        private readonly IChildRepository _childRepository;
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;

        public ChildCommandHandler(IChildRepository childRepository, IUserRepository userRepository, IGroupRepository groupRepository)
        {
            _childRepository = childRepository;
            _userRepository = userRepository;
            _groupRepository = groupRepository;
        }

        public async Task<Unit> Handle(CreateChildCommand request, CancellationToken cancellationToken)
        {

            var parent = _userRepository.Get(request.ParentId)
                    ?? throw new UserNotFoundException(request.ParentId);

            var group = _groupRepository.Get(request.GroupId)
                    ?? throw new GroupNotFoundException(request.ParentId);

            var child = new Child
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth,
                Parent = parent,
                Group = group,
                CreatedAt = DateTime.Now
            };

            _childRepository.Add(child);
            await _childRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
