using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace bookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        public CityController(){

        }

        [HttpGet("")]
        public IEnumerable<string> Getstrings(){
            return new string[] {"Atlanta", "New York"};
        }








        [HttpGet("{id}")]
        public ActionResult<string> GetstringById(int id){
            return null;
        }

        [HttpPost("")]
        public void Poststring(string value){

        }

        [HttpPut("{id}")]
        public void Putstring(int id, string value){

        }

        [HttpDelete("{id}")]
        public void DeletestringById(int id){

        }

    }
}