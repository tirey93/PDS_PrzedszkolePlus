using Domain.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Properties;
using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;
using System.Net;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AttendanceController(IMediator mediator)
        {
            _mediator = mediator;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult<IEnumerable<AttendanceResponse>>> GetByGroup(int group_id, DateOnly from, DateOnly to)
        {
            try
            {
                var query = new GetAttendancesByGroupQuery
                {
                    GroupId = group_id,
                    DateFrom = from,
                    DateTo = to
                };
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (GroupNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }
    }
}