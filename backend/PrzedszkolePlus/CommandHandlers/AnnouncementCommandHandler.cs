using Domain;
using PrzedszkolePlus.Commands;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.CommandHandlers
{
    public class AnnouncementCommandHandler : IRequestHandler<CreateAnnouncementCommand, Unit>
    { 
        private readonly IAnnouncementRepository _announcementRepository;

        public AnnouncementCommandHandler(IAnnouncementRepository announcementRepository)
        {
            _announcementRepository = announcementRepository;
        }

        public async Task<Unit> Handle(CreateAnnouncementCommand request, CancellationToken cancellationToken)
        {
            var announcement = new Announcement
            {
                Title = request.Title,
                Content = request.Content,
                FilePath = request.FilePath,
                CreatedAt = DateTime.Now
            };

            _announcementRepository.Add(announcement);
            await _announcementRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
