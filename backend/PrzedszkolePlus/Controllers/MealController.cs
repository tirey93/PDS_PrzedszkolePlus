using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MealController : ControllerBase
    {
        public MealController()
        {

        }

        [HttpPost]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Post([FromBody] MealRequest dto)
        {
            return NoContent();
        }


        [HttpGet("ByChild/{child_id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public ActionResult<IEnumerable<MealResponse>> GetByChild(int child_id, DateOnly from, DateOnly to)
        {
            return new List<MealResponse>
            {
                new MealResponse
                {
                    Id = 1,
                    GroupId = 1,
                    Date = from,
                    Breakfast = "Jajecznica",
                    Lunch = "Zupa pomidorowa",
                    Dinner = "Kanapki"
                },
                new MealResponse
                {
                    Id = 2,
                    GroupId = 1,
                    Date = to,
                    Breakfast = "Omlet",
                    Lunch = "Rosół",
                    Dinner = "Jogurt"
                }
            };
        }

        [HttpGet("ByGroup/{group_id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public ActionResult<IEnumerable<MealResponse>> GetByGroup(int group_id, DateOnly from, DateOnly to)
        {
            return new List<MealResponse>
            {
                new MealResponse
                {
                    Id = 1,
                    GroupId = group_id,
                    Date = from,
                    Breakfast = "Jajecznica",
                    Lunch = "Zupa pomidorowa",
                    Dinner = "Kanapki"
                },
                new MealResponse
                {
                    Id = 2,
                    GroupId = group_id,
                    Date = to,
                    Breakfast = "Omlet",
                    Lunch = "Rosół",
                    Dinner = "Jogurt"
                }
            };
        }

        [HttpPut("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Put(int id, MealRequest dto)
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