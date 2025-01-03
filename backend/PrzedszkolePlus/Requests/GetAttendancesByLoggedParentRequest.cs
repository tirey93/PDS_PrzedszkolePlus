using FluentValidation;
using PrzedszkolePlus.Properties;

namespace PrzedszkolePlus.Requests
{
    public class GetAttendancesByLoggedParentRequest
    {
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
    }

    public class GetAttendancesByLoggedParentRequestValidator : AbstractValidator<GetAttendancesByLoggedParentRequest>
    {
        public GetAttendancesByLoggedParentRequestValidator()
        {
            RuleFor(activityRequest => activityRequest.DateFrom)
                .LessThanOrEqualTo(activityRequest => activityRequest.DateTo)
                .WithMessage(Resource.ValidatorDateFromBeforeOrEqualToDateTo);
        }
    }
}