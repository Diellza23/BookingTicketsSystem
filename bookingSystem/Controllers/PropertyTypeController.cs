using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using bookingSystem.Dtos;
using bookingSystem.Interfaces;

namespace bookingSystem.Controllers
{
    [Route("api/[controller]")]
    public class PropertyTypeController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PropertyTypeController(IUnitOfWork uow, IMapper mapper)
        {
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

    }
}
