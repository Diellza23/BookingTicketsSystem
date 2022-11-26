using System;
using System.Threading.Tasks;
using Enum;
using IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;
using Models.BindingModel;

namespace bookingSystem.Controllers
{

    [Authorize(Roles = "Admin,User")]
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertyController(IPropertyService propertyService)
        {
            _propertyService = propertyService;

        }

        // [Authorize(Roles = "Admin,User")]
        [HttpPost("AddUpdateProperty")]
        public async Task<object> AddUpdateProperty([FromBody] AddUpdateProperty model)
        {
            try
            {
                if (model == null || model.Name.Length < 1)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Parameters are missing", null));
                }
                var result = await _propertyService.AddUpdateProperty(model.Id, model.Name, model.PropertyType, model.FurnishingType, model.Price, model.BuiltArea, model.Address, model.Address2, model.City, model.Country, model.FloorNo, model.TotalFloors, model.ReadyToMove, model.MainEntrance, model.Security, model.Maintenance, model.Description, model.AppUserId, model.Publish);

                return await Task.FromResult(new ResponseModel(ResponseCode.OK, (model.Id > 0 ? "Recorded Update" : "New Record added"), result));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPost("DeleteProperty")]
        public async Task<object> DeleteProperty([FromBody] int id)
        {
            try
            {
                if (id < 1)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Parameters are missing", null));
                }

                var result = await _propertyService.DeleteProperty(id);


                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Record Deleted", result));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }

        [AllowAnonymous]
        [HttpGet("GetPropertyList")]
        public async Task<object> GetPropertyList([FromQuery] string AuthorId)
        {
            try
            {
                if (AuthorId.Length < 3)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Parameters are missing", null));
                }

                var result = await _propertyService.GetAllProperties(AuthorId);


                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", result));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }











    }
}
