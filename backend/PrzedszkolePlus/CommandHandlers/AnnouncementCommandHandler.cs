using Domain;
using PrzedszkolePlus.Commands;
using MediatR;
using Domain.Repositories;
using Domain.Exceptions;

namespace PrzedszkolePlus.CommandHandlers
{
    public class AnnouncementCommandHandler : IRequestHandler<CreateAnnouncementCommand, Unit>,
                                              IRequestHandler<DeleteAnnouncementCommand, Unit>
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

        public async Task<Unit> Handle(DeleteAnnouncementCommand request, CancellationToken cancellationToken)
        {
            var child = _announcementRepository.Get(request.AnnouncementId)
                ?? throw new AnnouncementNotFoundException(request.AnnouncementId);

            _announcementRepository.Delete(child);
            await _announcementRepository.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
