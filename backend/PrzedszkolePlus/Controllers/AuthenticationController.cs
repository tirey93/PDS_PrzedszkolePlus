using Domain.Exceptions;
using PrzedszkolePlus.Commands;
using PrzedszkolePlus.Constants;
using PrzedszkolePlus.Exceptions;
using PrzedszkolePlus.Extensions;
using PrzedszkolePlus.Properties;
using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;
using PrzedszkolePlus.Utils;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;

namespace PrzedszkolePlus.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMediator _mediator;

        public AuthenticationController(IConfiguration configuration, IMediator mediator)
        {
            _configuration = configuration;
            _mediator = mediator;
        }

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult<UserResponse>> Register([FromBody] RegisterRequest dto)
        {
            var command = new RegisterCommand
            {
                DisplayName = dto.DisplayName,
                Password = dto.Password,
                Username = dto.Username,
                Role = dto.Role
            };

            try
            {
                var response = await _mediator.Send(command);
                return Ok(response);
            }
            catch (UserAlreadyExistsException ex)
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

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [AllowAnonymous]
        public async Task<ActionResult<UserResponse>> Login([FromBody] LoginRequest dto)
        {
            var query = new LoginQuery
            {
                Password = dto.Password,
                Username = dto.Username
            };
            try
            {
                var response = await _mediator.Send(query);
                AppendToCookie(response);

                return Ok(new UserResponse
                {
                    Id = response.Id,
                    Name = response.Name,
                    DisplayName = response.DisplayName,
                    Role = response.Role,
                });
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound,
                    string.Format(Resource.ControllerNotFound, ex.Message));
            }
            catch (PasswordNotMatchException ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    string.Format(Resource.ControllerBadRequest, ex.Message));
            }
            catch (UserIsNotActiveException ex)
            {
                return StatusCode((int)HttpStatusCode.Forbidden,
                    string.Format(Resource.ControllerForbidden, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPost("Logout")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public IActionResult Logout()
        {
            try
            {
                Response.Cookies.Delete(Cookies.UserId, new CookieOptions()
                {
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    HttpOnly = true,
                    MaxAge = new TimeSpan(12, 0, 0),
                    Domain = "localhost"
                });
                Response.Cookies.Delete(Cookies.AccessToken, new CookieOptions()
                {
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    HttpOnly = true,
                    MaxAge = new TimeSpan(12, 0, 0),
                    Domain = "localhost"
                });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        private void AppendToCookie(UserResponse response)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Role, response.Role)
            };

            var signingKey = Environment.GetEnvironmentVariable(_configuration["JWT:EnvironmentSecretVariableName"]);
            if (string.IsNullOrEmpty(signingKey))
                throw new MissingSigningKeyException();

            var token = JwtHelper.GetJwtToken(
                response.Name,
                signingKey,
                _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                TimeSpan.FromMinutes(24 * 60),
                claims.ToArray());

            Response.Cookies
                .AppendToCookie(Cookies.AccessToken, new JwtSecurityTokenHandler().WriteToken(token))
                .AppendToCookie(Cookies.UserId, response.Id.ToString());
        }
    }
}