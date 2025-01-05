using MediatR;
using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Commands;
using PrzedszkolePlus.Properties;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;
using System.Net;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnnouncementController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AnnouncementController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult> Post([FromBody] AnnouncementRequest dto)
        {
            var request = new CreateAnnouncementCommand
            {
                Title = dto.Title,
                Content = dto.Content,
                FilePath = dto.FilePath,
            };

            try
            {
                await _mediator.Send(request);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpGet]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult<IEnumerable<AnnouncementResponse>> Get()
        {
            return new List<AnnouncementResponse>
            {
                new AnnouncementResponse
                {
                    Id = 1,
                    Title = "Tytuł 1",
                    Content = "Content 1",
                    FilePath = "https://images6.alphacoders.com/337/337780.jpg",
                    CreatedAt = DateTime.Now.AddDays(-1),
                },
                new AnnouncementResponse
                {
                    Id = 2,
                    Title = "Tytuł 2",
                    Content = "Content 2",
                    FilePath = "https://images6.alphacoders.com/337/337780.jpg",
                    CreatedAt = DateTime.Now,
                }
            };
        }

        [HttpPut("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Put(int id, AnnouncementRequest dto)
        {
            return NoContent();
        }

        [HttpDelete("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public ActionResult Delete(int id)
        {
            return NoContent();
        }
    }
}