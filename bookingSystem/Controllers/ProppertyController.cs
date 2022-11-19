using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using bookingSystem.Dtos;
using bookingSystem.Interfaces;
using bookingSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace bookingSystem.Controllers
{
    [Route("api/[controller]")]
    public class ProppertyController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        private readonly IConfiguration _configuration;

        public ProppertyController(IUnitOfWork uow, IMapper mapper, IPhotoService photoService, IConfiguration configuration)
        {
            this.photoService = photoService;
            this.uow = uow;
            this.mapper = mapper;
            _configuration = configuration;
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