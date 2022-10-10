using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using bookingSystem.Dtos;
using bookingSystem.Interfaces;
using bookingSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace bookingSystem.Controllers
{
    [Route("api/[controller]")]
    public class ProppertyController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public ProppertyController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("list/{sellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var propertyListDTO = mapper.Map<IEnumerable<PropertyListDto>>(properties);
            return new JsonResult(propertyListDTO);
        }

        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyDetail(int id)
        {
            var property = await uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertyDTO = mapper.Map<PropertyDetailDto>(property);
            return new JsonResult(propertyDTO);
        }


        // propperty/add
        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {
            var property = mapper.Map<Propperty>(propertyDto);
            property.PostedBy = 1;
            property.LastUpdatedBy = 1;
            uow.PropertyRepository.AddProperty(property);
            await uow.SaveAsync();
            return new JsonResult("Added");
        }

        [HttpDelete("deleteProperty/id")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            uow.PropertyRepository.DeleteProperty(id);
            await uow.SaveAsync();
            return new JsonResult("Deleted", id);
        }

        [HttpGet("allProperties")]
        public async Task<IActionResult> GetProperties()
        {
            // throw new UnauthorizedAccessException();
            var properties = await uow.PropertyRepository.GetProperties();
            var propertiesDto = mapper.Map<IEnumerable<PropertyDto>>(properties);
            return new JsonResult(propertiesDto);
        }




    }
}