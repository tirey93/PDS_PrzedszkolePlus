using PrzedszkolePlus.Commands;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.CommandHandlers
{
    public class ThreadCommandHandler : 
        IRequestHandler<CreateThreadCommand, Unit>,
        IRequestHandler<UpdateThreadLastReadCommand, Unit>
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IChildRepository _childRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ThreadCommandHandler(IAttendanceRepository attendanceRepository, IChildRepository childRepository,
                                        IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _attendanceRepository = attendanceRepository;
            _childRepository = childRepository;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<Unit> Handle(CreateThreadCommand request, CancellationToken cancellationToken)
        {
            //UserNotFoundException
            throw new NotImplementedException();
        }

        public Task<Unit> Handle(UpdateThreadLastReadCommand request, CancellationToken cancellationToken)
        {
            //ThreadNotFoundException
            throw new NotImplementedException();
        }
    }
}