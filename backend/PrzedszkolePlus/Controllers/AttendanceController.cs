using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AttendanceController : ControllerBase
    {
        public AttendanceController()
        {

        }

        [HttpPost]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public IActionResult Post([FromBody] AttendanceRequest dto)
        {
            return NoContent();
        }

        [HttpGet("ChildrenByLoggedUser")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult<IEnumerable<AttendanceResponse>> GetByLoggedUser(DateOnly from, DateOnly to)
        {
            return new List<AttendanceResponse>
            {
                new AttendanceResponse
                {
                    Id = 1,
                    ChildId = 1,
                    Date = from,
                    Status = true
                },
                new AttendanceResponse
                {
                    Id = 2,
                    ChildId = 2,
                    Date = to,
                    Status = false
                }
            };
        }

        [HttpGet("ByGroup/{group_id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public ActionResult<IEnumerable<AttendanceResponse>> GetByGroup(int group_id, DateOnly from, DateOnly to)
        {
            return new List<AttendanceResponse>
            {
                new AttendanceResponse
                {
                    Id = 1,
                    ChildId = 1,
                    Date = from,
                    Status = true
                },
                new AttendanceResponse
                {
                    Id = 2,
                    ChildId = 2,
                    Date = to,
                    Status = false
                }
            };
        }
    }
}