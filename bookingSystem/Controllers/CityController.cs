using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using bookingSystem.Dtos;
using bookingSystem.Interfaces;
using bookingSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
// using Claim.Data;
using Microsoft.AspNetCore.Mvc;

namespace bookingSystem.Controllers
{
    // [Authorize]
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet]
        // [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            // throw new UnauthorizedAccessException();
            var cities = await uow.CityRepository.GetCitiesAsync();
            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(citiesDto);
        }

        //post api/city/add?cityname=Miami
        // [HttpPost("add")]
        // [HttpPost("post")]
        // [HttpPost("add/{cityname}")]
        // public async Task<IActionResult> AddCity(string cityName)
        // {
        //     City city = new City();
        //     city.Name = cityName;
        //     await dc.Cities.AddAsync(city);
        //     await dc.SaveChangesAsync();
        //     return Ok(city);

        // }

        //post api/city/post ne json forme
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);
            // city.LastUpdatedBy = 1;
            // city.LastUpdatedOn = DateTime.Now;
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            if (id != cityDto.Id)
                return BadRequest("Update is not allowed");


            var cityFromDb = await uow.CityRepository.FindCity(id);
            if (cityFromDb == null)
                return BadRequest("Update not allowed");

            // cityFromDb.LastUpdatedBy = 1;
            // cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            // throw new Exception("Some unknown error occurred");
            await uow.SaveAsync();
            return StatusCode(200);

        }

        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            // cityFromDb.LastUpdatedBy = 1;
            // cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }


        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> citytoPatch)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            // cityFromDb.LastUpdatedBy = 1;
            // cityFromDb.LastUpdatedOn = DateTime.Now;

            citytoPatch.ApplyTo(cityFromDb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }


        //post api/city/add?cityname=Miami
        // [HttpPost("add")]
        // [HttpPost("post")]
        // [HttpPost("add/{cityname}")]
        // public async Task<IActionResult> AddCity(string cityName)
        // {
        //     City city = new City();
        //     city.Name = cityName;
        //     await dc.Cities.AddAsync(city);
        //     await dc.SaveChangesAsync();
        //     return Ok(city);

        // }























        [HttpGet("{id}")]
        public ActionResult<string> GetstringById(int id)
        {
            return null;
        }

        [HttpPost("")]
        public void Poststring(string value)
        {

        }

        [HttpPut("{id}")]
        public void Putstring(int id, string value)
        {

        }

        [HttpDelete("{id}")]
        public void DeletestringById(int id)
        {

        }

    }
}