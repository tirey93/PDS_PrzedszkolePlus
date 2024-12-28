using Domain;
using Domain.Exceptions;
using PrzedszkolePlus.Commands;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.CommandHandlers
{
    public class GroupCommandHandler : IRequestHandler<CreateGroupCommand, Unit>
    {
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;

        public GroupCommandHandler(IUserRepository userRepository, IGroupRepository groupRepository)
        {
            _userRepository = userRepository;
            _groupRepository = groupRepository;
        }

        public async Task<Unit> Handle(CreateGroupCommand request, CancellationToken cancellationToken)
        {
            var caregiver = _userRepository.Get(request.CaregiverId)
                ?? throw new UserNotFoundException(request.CaregiverId);

            if (caregiver.Role != Role.Admin)
                throw new UserIsNotCaregiverException(request.CaregiverId);

            var existingGroup = _groupRepository.GetList(u => u.Name.ToLower() == request.Name.ToLower());
            if (existingGroup.Any())
                throw new GroupAlreadyExistsException(request.Name);

            var group = new Group
            {
                Caregiver = caregiver,
                Name = request.Name,
                CreatedAt = DateTime.Now
            };

            _groupRepository.Add(group);
            await _groupRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}