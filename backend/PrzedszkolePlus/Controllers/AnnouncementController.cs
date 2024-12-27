using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnnouncementController : ControllerBase
    {
        public AnnouncementController()
        {

        }

        [HttpPost]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Post([FromBody] AnnouncementRequest dto)
        {
            return NoContent();
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