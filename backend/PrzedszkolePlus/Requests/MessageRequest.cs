using FluentValidation;
using PrzedszkolePlus.Properties;

namespace PrzedszkolePlus.Requests
{
    public class MessageRequest
    {
        public int ThreadId { get; set; }
        public string Content { get; set; }
    }

    public class MessageRequestValidator : AbstractValidator<MessageRequest>
    {
        public MessageRequestValidator()
        {
            RuleFor(messageRequest => messageRequest.Content)
                .NotEmpty().WithMessage(Resource.ValidatorMessageRequired);
        }
    }
}