using FluentValidation;
using PrzedszkolePlus.Properties;

namespace PrzedszkolePlus.Requests
{
    public class GetAttendancedByGroupRequest
    {
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
    }

    public class GetAttendancedByGroupRequestValidator : AbstractValidator<GetAttendancedByGroupRequest>
    {
        public GetAttendancedByGroupRequestValidator()
        {
            RuleFor(activityRequest => activityRequest.DateFrom)
                .LessThanOrEqualTo(activityRequest => activityRequest.DateTo)
                .WithMessage(Resource.ValidatorDateFromBeforeOrEqualToDateTo);
        }
    }
}