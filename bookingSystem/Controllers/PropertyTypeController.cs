using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using bookingSystem.Dtos;
using bookingSystem.Interfaces;
using bookingSystem.Models;
using System;
using Claim.Data;

namespace bookingSystem.Controllers
{
    [Route("api/[controller]")]
    public class PropertyTypeController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly AppDBContext _appDbContext;

        public PropertyTypeController(IUnitOfWork uow, IMapper mapper, AppDBContext appDBContext)
        {
            _appDbContext = appDBContext;
            this.uow = uow;
            this.mapper = mapper;
        }

        // GET api/propertytype/list
        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyTypes()
        {
            var PropertyTypes = await uow.PropertyTypeRepository.GetPropertyTypesAsync();
            var PropertyTypesDto = mapper.Map<IEnumerable<KeyValuePairDto>>(PropertyTypes);
            return new JsonResult(PropertyTypesDto);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddPropertyType(PropertyTypeDto propertyTypeDto)
        {
            var propertyType = mapper.Map<PropertyType>(propertyTypeDto);
            propertyType.LastUpdatedBy = 1;
            propertyType.LastUpdatedOn = DateTime.Now;
            uow.PropertyTypeRepository.AddPropertyType(propertyType);
            await uow.SaveAsync();
            return new JsonResult(propertyType);
        }

        [HttpPost("addPropType")]
        public async Task<IActionResult> AddPropType(int LastUpdatedBy, DateTime LastUpdatedOn, string Name)
        {
            PropertyType propperty = new PropertyType();
            propperty.Name = Name;
            await _appDbContext.PropertyTypes.AddAsync(propperty);
            await _appDbContext.SaveChangesAsync();
            return new OkResult();

        }

    }
}
