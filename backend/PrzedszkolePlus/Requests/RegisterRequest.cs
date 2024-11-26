using FluentValidation;
using PrzedszkolePlus.Properties;

namespace PrzedszkolePlus.Requests
{
    public class RegisterRequest
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(registerRequest => registerRequest.Username)
                .NotEmpty().WithMessage(Resource.ValidatorUsernameRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorUsernameLonger)
                .MaximumLength(20).WithMessage(Resource.ValidatorUsernameShorter);

            RuleFor(registerRequest => registerRequest.DisplayName)
                .NotEmpty().WithMessage(Resource.ValidatorDisplayNameRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorDisplayNameLonger)
                .MaximumLength(20).WithMessage(Resource.ValidatorDisplayNameShorter);

            RuleFor(registerRequest => registerRequest.Password)
                .NotEmpty().WithMessage(Resource.ValidatorPasswordRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorPasswordLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorPasswordShorter);
        }
    }
}