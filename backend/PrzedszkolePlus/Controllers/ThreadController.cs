using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ThreadController : ControllerBase
    {
        public ThreadController()
        {

        }

        [HttpPost]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public IActionResult Post([FromBody] ThreadRequest dto)
        {
            return NoContent();
        }

        [HttpPut("{id:int}/Read")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public IActionResult PutRead(int id)
        {
            return NoContent();
        }

        [HttpGet("ByLoggedUser")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult<IEnumerable<ThreadResponse>> GetByLoggedUser()
        {
            return new List<ThreadResponse>
            {
                new ThreadResponse
                {
                    Id = 1,
                    IsRead = true,
                    ReceiverId = 12,
                    Subject = "Subject1"
                },
                new ThreadResponse
                {
                    Id = 2,
                    IsRead = false,
                    ReceiverId = 13,
                    Subject = "Subject2"
                }
            };
        }

    }
}