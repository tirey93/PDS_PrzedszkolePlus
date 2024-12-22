using Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Properties;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;
using PrzedszkolePlus.Commands;
using System.Net;
using MediatR;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChildController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ChildController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult> Post([FromBody] ChildRequest dto)
        {
            var request = new CreateChildCommand
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DateOfBirth = dto.DateOfBirth,
                ParentId = dto.ParentId,
                GroupId = dto.GroupId
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

        [HttpGet("ByParent/{id}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public ActionResult<IEnumerable<ChildResponse>> GetByParent(int id)
        {
            return new List<ChildResponse>
            {
                new ChildResponse
                {
                    Id = 1,
                    FirstName = "Marta",
                    LastName = "Ślimak",
                    DateOfBirth = DateOnly.FromDateTime(DateTime.Now.AddDays(-1000)),
                    ParentId = id,
                    GroupId = 1,
                    CreatedAt = DateTime.Now
                },
                new ChildResponse
                {
                    Id = 2,
                    FirstName = "Kacper",
                    LastName = "Kowalski",
                    DateOfBirth = DateOnly.FromDateTime(DateTime.Now.AddDays(-1500)),
                    ParentId = id,
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
