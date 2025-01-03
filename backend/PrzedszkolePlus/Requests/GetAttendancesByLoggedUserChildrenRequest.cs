using FluentValidation;
using PrzedszkolePlus.Properties;

namespace PrzedszkolePlus.Requests
{
    public class GetAttendancesByLoggedUserChildrenRequest
    {
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
    }

    public class GetAttendancesByLoggedUserChildrenRequestValidator : AbstractValidator<GetAttendancesByLoggedUserChildrenRequest>
    {
        public GetAttendancesByLoggedUserChildrenRequestValidator()
        {
            RuleFor(activityRequest => activityRequest.DateFrom)
                .LessThanOrEqualTo(activityRequest => activityRequest.DateTo)
                .WithMessage(Resource.ValidatorDateFromBeforeOrEqualToDateTo);
        }
    }
}