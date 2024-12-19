using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupController : ControllerBase
    {
        public GroupController()
        {

        }

        [HttpPost]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Post([FromBody] GroupRequest dto)
        {
            return NoContent();
        }

        [HttpGet("ByLoggedUser")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public ActionResult<GroupResponse> Get()
        {
            return new GroupResponse
            {
                Id = 1,
                Name = "Pszczółki",
                CaregiverId = 1,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now.AddDays(-2))
            };
        }

        [HttpPut("{id}/name")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult UpdateGroupName(int id, [FromBody] UpdateGroupNameRequest dto)
        {
            return NoContent();
        }
    }
}
