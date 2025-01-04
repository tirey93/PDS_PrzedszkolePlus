using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        public MessageController()
        {

        }

        [HttpPost]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public IActionResult Post([FromBody] MessageRequest dto)
        {
            return NoContent();
        }


        [HttpGet("ByThread/{threadId:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult<IEnumerable<MessageResponse>> GetByThread(int threadId)
        {
            return new List<MessageResponse>
            {
                new MessageResponse
                {
                    Id = 1,
                    CreatedAt = DateTime.Now,
                    Content = "Message1",
                    SenderId = 12
                },
                new MessageResponse
                {
                    Id = 1,
                    CreatedAt = DateTime.Now,
                    Content = "Message2",
                    SenderId = 13
                },
            };
        }

    }
}