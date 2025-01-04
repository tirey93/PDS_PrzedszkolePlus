using PrzedszkolePlus.Commands;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.CommandHandlers
{
    public class MessageCommandHandler : 
        IRequestHandler<CreateMessageCommand, Unit>
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IChildRepository _childRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MessageCommandHandler(IAttendanceRepository attendanceRepository, IChildRepository childRepository,
                                        IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _attendanceRepository = attendanceRepository;
            _childRepository = childRepository;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<Unit> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            //ThreadNotFoundException
            throw new NotImplementedException();
        }
    }
}