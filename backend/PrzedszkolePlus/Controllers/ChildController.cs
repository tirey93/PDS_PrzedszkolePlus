using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChildController : ControllerBase
    {
        public ChildController()
        {

        }

        [HttpPost]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Post([FromBody] ChildRequest dto)
        {
            return NoContent();
        }

        [HttpGet("ByLoggedUser")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult<IEnumerable<ChildResponse>> Get()
        {
            return new List<ChildResponse>
            {
                new ChildResponse
                {
                    Id = 1,
                    FirstName = "Kamil",
                    LastName = "Ślimak",
                    DateOfBirth = DateOnly.FromDateTime(DateTime.Now.AddDays(-1000)),
                    ParentId = 1,
                    GroupId = 1,
                    CreatedAt = DateTime.Now
                },
                new ChildResponse
                {
                    Id = 2,
                    FirstName = "Adam",
                    LastName = "Kowalski",
                    DateOfBirth = DateOnly.FromDateTime(DateTime.Now.AddDays(-1500)),
                    ParentId = 2,
                    GroupId = 1,
                    CreatedAt = DateTime.Now.AddDays(-2)
                }
            };
        }

        [HttpGet("ByGroup/{group_id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public ActionResult<IEnumerable<ChildResponse>> Get(int group_id)
        {
            return new List<ChildResponse>
            {
                new ChildResponse
                {
                    Id = 1,
                    FirstName = "Kamil",
                    LastName = "Ślimak",
                    DateOfBirth = DateOnly.FromDateTime(DateTime.Now.AddDays(-1000)),
                    ParentId = 1,
                    GroupId = group_id,
                    CreatedAt = DateTime.Now
                },
                new ChildResponse
                {
                    Id = 2,
                    FirstName = "Adam",
                    LastName = "Kowalski",
                    DateOfBirth = DateOnly.FromDateTime(DateTime.Now.AddDays(-1500)),
                    ParentId = 2,
                    GroupId = group_id,
                    CreatedAt = DateTime.Now.AddDays(-2)
                }
            };
        }

        [HttpPut("{child_id:int}/parent/{parent_id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult PutParent(int child_id, int parent_id)
        {
            return NoContent();
        }

        [HttpPut("{child_id:int}/group/{group_id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult PutGroup(int child_id, int group_id)
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
