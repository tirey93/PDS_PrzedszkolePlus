using Domain.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Commands;
using PrzedszkolePlus.Exceptions;
using PrzedszkolePlus.Properties;
using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;
using System.Net;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MessageController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<IActionResult> Post([FromBody] MessageRequest dto)
        {
            var request = new CreateMessageCommand
            {
                Content = dto.Content,
                ThreadId = dto.ThreadId,
            };

            try
            {
                await _mediator.Send(request);
                return NoContent();
            }
            catch (ThreadNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (InvalidCookieException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (UserNotAllowedInThreadException ex)
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


        [HttpGet("ByThread/{threadId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult<IEnumerable<MessageResponse>>> GetByThread(int threadId)
        {
            try
            {
                var query = new GetMessagesByThreadQuery
                {
                    ThreadId = threadId
                };
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (ThreadNotFoundException ex)
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