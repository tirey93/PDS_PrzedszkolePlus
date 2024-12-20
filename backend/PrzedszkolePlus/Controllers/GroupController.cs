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
                CreatedAt = DateTime.Now.AddDays(-2)
            };
        }

        [HttpGet]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult<IEnumerable<GroupResponse>> GetAllGroups()
        {
            return new List<GroupResponse>
            {
                 new GroupResponse
                 {
                    Id = 1,
                    Name = "Pszczółki",
                    CaregiverId = 1,
                    CreatedAt = DateTime.Now.AddDays(-2)
                 },
                 new GroupResponse
                 {
                    Id = 2,
                    Name = "Malinki",
                    CaregiverId = 2,
                    CreatedAt = DateTime.Now.AddDays(-4)
                 },
                new GroupResponse
                 {
                    Id = 3,
                    Name = "Poziomki",
                    CaregiverId = 3,
                    CreatedAt = DateTime.Now.AddDays(-6)
                 }
            };
        }

        [HttpPut("{id}/Name")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult UpdateGroupName(int id, [FromBody] UpdateGroupNameRequest dto)
        {
            return NoContent();
        }
    }
}
