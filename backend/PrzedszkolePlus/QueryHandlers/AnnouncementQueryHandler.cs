using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Response;
using MediatR;
using Domain.Repositories;

namespace PrzedszkolePlus.QueryHandlers
{
    public class AnnouncementQueryHandler : IRequestHandler<GetAllAnnouncementsQuery, IEnumerable<AnnouncementResponse>>
    {
        private readonly IAnnouncementRepository _announcementRepository;

        public AnnouncementQueryHandler(IAnnouncementRepository announcementRepository)
        {
            _announcementRepository = announcementRepository;
        }

        public Task<IEnumerable<AnnouncementResponse>> Handle(GetAllAnnouncementsQuery request, CancellationToken cancellationToken)
        {
            var announcements = _announcementRepository.GetList();

            if (announcements == null)
            {
                return Task.FromResult(Enumerable.Empty<AnnouncementResponse>());
            }

            var result = announcements.Select(x => new AnnouncementResponse
            {
                Id = x.Id,
                Title = x.Title,
                Content = x.Content,
                FilePath = x.FilePath,
                CreatedAt = DateTime.UtcNow,
            });

            return Task.FromResult(result);
        }
    }
}
