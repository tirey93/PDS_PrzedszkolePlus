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
    public class GroupController : ControllerBase
    {
        private readonly IMediator _mediator;
        public GroupController(IMediator mediator)
        {
            _mediator = mediator;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult<IEnumerable<GroupResponse>>> GetAllGroups()
        {
            try
            {
                var query = new GetAllGroupsQuery();
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
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
