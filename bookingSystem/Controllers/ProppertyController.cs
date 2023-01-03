using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using bookingSystem.Dtos;
using bookingSystem.Interfaces;
using bookingSystem.Models;
using Claim.Data;
using Data.Entities;
using Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Model;
using Model.BindingModel;

namespace bookingSystem.Controllers
{
    [Route("api/[controller]")]
    public class ProppertyController : ControllerBase
    {
        private readonly AppDBContext appDBContext;
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;
        private readonly UserManager<AppUser> _userManager;

        private readonly IConfiguration _configuration;

        public ProppertyController(AppDBContext _appDbContext, IUnitOfWork uow, IMapper mapper, IPhotoService photoService, IConfiguration configuration, UserManager<AppUser> userManager)
        {
            _appDbContext = appDBContext;
            this.photoService = photoService;
            this.uow = uow;
            this.mapper = mapper;
            _configuration = configuration;
            _userManager = userManager;
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
            propertyDTO.FullName = property.AppUser.FullName;
            propertyDTO.PhoneNumber = property.AppUser.PhoneNumber;
            propertyDTO.Email = property.AppUser.Email;
            propertyDTO.State = property.AppUser.State;


            // var user = property.AppUser.FullName;
            // Console.WriteLine(user);
            return new JsonResult(propertyDTO);
        }

        // [Authorize(Roles = "Admin,User")]
        [HttpPost("AddUpdateProperty")]
        public async Task<object> AddUpdateProperty([FromBody] PropertyDto model)
        {

            try
            {
                if (model == null || model.Name.Length < 1)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Parameters are missing", null));
                }
                var result = await uow.PropertyRepository.AddUpdateProperty(model.Id, model.SellRent, model.Name, model.PropertyTypeId, model.FurnishingTypeId, model.Price, model.BHK, model.BuiltArea, model.CityId, model.ReadyToMove, model.CarpetArea, model.Address, model.Address2, model.FloorNo, model.TotalFloors, model.MainEntrance, model.Security, model.Gated, model.Maintenance, model.EstPossessionOn, model.Description, model.AppUserId);

                return await Task.FromResult(new ResponseModel(ResponseCode.OK, (model.Id > 0 ? "Recorded Update" : "New Record added"), result));
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

                var result = await uow.PropertyRepository.GetAllProperties(AuthorId);


                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", result));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }


        [Authorize(Roles = "Admin,User")]
        [HttpPost("DeleteProperty")]
        public async Task<object> DeleteProperty([FromBody] DeletePropBindingModel model)
        {
            try
            {
                if (model.Id < 1)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Parameters are missing", null));
                }

                var result = await uow.PropertyRepository.DeleteProperty(model.Id);


                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Record Deleted", result));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }








        // propperty/add
        // [HttpPost("add")]
        // [AllowAnonymous]
        // public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        // {

        //     var property = mapper.Map<Propperty>(propertyDto);
        //     property.PostedBy = 1;
        //     // property.LastUpdatedBy = 1;
        //     // property.Name = "diellza";
        //     uow.PropertyRepository.AddProperty(property);
        //     await uow.SaveAsync();
        //     // return new JsonResult("Added");
        //     return new JsonResult("IT DOESNT WORK");
        // }

        // [HttpDelete("deleteProperty/id")]
        // public async Task<IActionResult> DeleteProperty(int id)
        // {
        //     uow.PropertyRepository.DeleteProperty(id);
        //     await uow.SaveAsync();
        //     return new JsonResult("Deleted", id);
        // }

        [HttpGet("allProperties")]
        public async Task<IActionResult> GetProperties()
        {
            // throw new UnauthorizedAccessException();
            var properties = await uow.PropertyRepository.GetProperties();
            var propertiesDto = mapper.Map<IEnumerable<PropertyDto>>(properties);
            return new JsonResult(propertiesDto);
        }

        [HttpPost("add/photo/{propId}")]
        [AllowAnonymous]
        public async Task<IActionResult> AddProppertyPhoto(IFormFile file, int propId)
        {
            var result = await photoService.UploadPhotoAsync(file);
            if (result.Error != null)
                return new JsonResult(result.Error.Message);

            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propId);

            var photo = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if (property.Photos.Count == 0)
            {
                photo.IsPrimary = true;
            }

            property.Photos.Add(photo);
            await uow.SaveAsync();
            return new JsonResult("Added");
        }


        [HttpGet("top3")]
        public JsonResult GetTopThree()
        {
            string query = @"select top 3 * from Propperties";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);

        }



        [HttpGet("top8")]
        public JsonResult GetTopEight()
        {
            string query = @"select top 8 * from Propperties";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }



        [HttpPost("set-primary-photo/{propId}/{photoPublicId}")]
        public async Task<IActionResult> SetPrimaryPhoto(int propId, string photoPublicId)
        {
            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propId);

            if (property == null)
                return new BadRequestObjectResult("No such property");


            var photo = property.Photos.FirstOrDefault(p => p.PublicId == photoPublicId);

            if (photo == null)
                return new BadRequestObjectResult("No such property or photo exists");

            if (photo.IsPrimary)
                return new BadRequestObjectResult("This is already a primary photo");

            var currentPrimary = property.Photos.FirstOrDefault(p => p.IsPrimary);
            if (currentPrimary != null) currentPrimary.IsPrimary = false;
            photo.IsPrimary = true;

            if (await uow.SaveAsync()) return new NoContentResult();

            return new BadRequestObjectResult("Some error occured, failed to set primary photo");

        }
        [HttpDelete("delete-photo/{propId}/{photoPublicId}")]

        public async Task<IActionResult> DeletePhoto(int propId, string photoPublicId)
        {
            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propId);

            if (property == null)
                return new BadRequestObjectResult("No such property or photo exists");

            var photo = property.Photos.FirstOrDefault(p => p.PublicId == photoPublicId);

            if (photo == null)
                return new BadRequestObjectResult("No such property or photo exists");

            if (photo.IsPrimary)
                return new BadRequestObjectResult("You can't delete this primary photo");

            var result = await photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null)
                return new BadRequestObjectResult(result.Error.Message);

            property.Photos.Remove(photo);

            if (await uow.SaveAsync()) return new OkResult();

            return new BadRequestObjectResult("Some error occurred, failed to delete this photo");

        }



    }
}