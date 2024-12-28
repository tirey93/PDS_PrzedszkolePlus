using Domain.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Commands;
using PrzedszkolePlus.Properties;
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
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult> Post([FromBody] GroupRequest dto)
        {
            var request = new CreateGroupCommand
            {
                Name = dto.Name,
                CaregiverId = dto.CaregiverId
            };

            try
            {
                await _mediator.Send(request);
                return NoContent();
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (UserIsNotCaregiverException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (GroupAlreadyExistsException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
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
