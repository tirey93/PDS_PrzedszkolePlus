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
                    CreatedAt = DateOnly.FromDateTime(DateTime.Now)
                },
                new ChildResponse
                {
                    Id = 2,
                    FirstName = "Adam",
                    LastName = "Kowalski",
                    DateOfBirth = DateOnly.FromDateTime(DateTime.Now.AddDays(-1500)),
                    ParentId = 2,
                    GroupId = 1,
                    CreatedAt = DateOnly.FromDateTime(DateTime.Now.AddDays(-2))
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
                    CreatedAt = DateOnly.FromDateTime(DateTime.Now)
                },
                new ChildResponse
                {
                    Id = 2,
                    FirstName = "Adam",
                    LastName = "Kowalski",
                    DateOfBirth = DateOnly.FromDateTime(DateTime.Now.AddDays(-1500)),
                    ParentId = 2,
                    GroupId = group_id,
                    CreatedAt = DateOnly.FromDateTime(DateTime.Now.AddDays(-2))
                }
            };
        }

        [HttpPut("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Put(int id, ChildRequest dto)
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
