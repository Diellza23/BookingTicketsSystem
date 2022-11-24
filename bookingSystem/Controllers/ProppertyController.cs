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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace bookingSystem.Controllers
{
    [Route("api/[controller]")]
    public class ProppertyController : ControllerBase
    {
        private readonly AppDBContext appDBContext;
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        private readonly IConfiguration _configuration;

        public ProppertyController(AppDBContext _appDbContext, IUnitOfWork uow, IMapper mapper, IPhotoService photoService, IConfiguration configuration)
        {
            _appDbContext = appDBContext;
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








        [HttpPost("Shtoo")]
        public async Task<IActionResult> AddOrEdit(int id, [Bind("Id,Name,Address,Address2,Security,SellRent,Maintenance,MainEntrance,FloorNo,SellRent,Description,BHK,CityId,ReadyToMove,TotalFloors,EstPossessionOn,FurnishingTypeId,Price,Gated,PropertyTypeId,BuiltArea,CarpetArea")]
        Propperty proppertyData)
        {
            bool DoesPropertyexist = false;

            Propperty property = await uow.PropertyRepository.FindProperty(id);

            if (property != null)
            {
                DoesPropertyexist = true;
            }
            else
            {
                property = new Propperty();
            }

            // if (ModelState.IsValid)
            // {
            try
            {
                property.Name = property.Name;
                property.Address = proppertyData.Address;
                property.Address2 = proppertyData.Address2;
                property.Security = proppertyData.Security;
                property.SellRent = proppertyData.SellRent;
                property.Maintenance = proppertyData.Maintenance;
                property.MainEntrance = proppertyData.MainEntrance;
                property.FloorNo = proppertyData.FloorNo;
                property.SellRent = proppertyData.SellRent;
                property.Description = proppertyData.Description;
                property.BHK = proppertyData.BHK;
                property.CityId = proppertyData.CityId;
                property.ReadyToMove = proppertyData.ReadyToMove;
                property.TotalFloors = proppertyData.TotalFloors;
                property.EstPossessionOn = proppertyData.EstPossessionOn;
                property.FurnishingTypeId = proppertyData.FurnishingTypeId;
                property.Price = proppertyData.Price;
                property.Gated = proppertyData.Gated;
                property.PropertyTypeId = proppertyData.PropertyTypeId;
                property.BuiltArea = proppertyData.BuiltArea;
                property.CarpetArea = proppertyData.CarpetArea;



                if (DoesPropertyexist)
                {
                    appDBContext.Update(property);
                }
                else
                {
                    appDBContext.Add(property);
                }
                await appDBContext.SaveChangesAsync();
            }
            catch (NullReferenceException)
            {
                // return new BadRequestResult();
                return new BadRequestResult();
            }
            return RedirectToAction(nameof(Index));
            // }
            // return new JsonResult("Idk");
        }







        [HttpPost("Shto")]
        public async Task<ActionResult<Propperty>> Shto(Propperty property)
        {
            await uow.PropertyRepository.CreatePropperty(property);
            // return CreatedAtAction("Post", new { id = property.Id }, property);
            await uow.SaveAsync();
            return new JsonResult("sadhasdh");
        }






        // propperty/add
        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {

            var property = mapper.Map<Propperty>(propertyDto);
            property.PostedBy = 1;
            property.LastUpdatedBy = 1;
            // property.Name = "diellza";
            uow.PropertyRepository.AddProperty(property);
            await uow.SaveAsync();
            // return new JsonResult("Added");
            return new JsonResult("IT DOESNT WORK");
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



        



        // [HttpPut("edit/{id}")]
        // public async Task<IActionResult> UpdateProperty(int id, int bhk, string name, int price, int builtArea, int carpetArea, string address, string address2, int floorNo, int totalFloors, bool readyToMove, string mainEntrance, int security, bool gated, int maintenance, string desciption)
        // {
        //     var property = await uow.PropertyRepository.FindProperty(id);


        //     property.Name = name;
        //     property.BHK = bhk;
        //     property.Price = price;
        //     property.BuiltArea = builtArea;
        //     property.CarpetArea = carpetArea;
        //     property.Address = address;
        //     property.Address2 = address2;
        //     property.FloorNo = floorNo;
        //     property.TotalFloors = totalFloors;
        //     property.ReadyToMove = readyToMove;
        //     property.MainEntrance = mainEntrance;
        //     property.Maintenance = maintenance;
        //     property.Security = security;
        //     property.Gated = gated;
        //     property.Description = desciption;
        //     // mapper.Map(propertyUpdateDto, property);
        //     // await uow.SaveAsync();

        //     if (await uow.SaveAsync())
        //     {
        //         return new JsonResult("Worked");
        //     }
        //     else
        //     {
        //         return new BadRequestObjectResult("Could not be updated, check for errors");
        //         // return new JsonResult("Something went wrong");
        //     }
        // }

        // [HttpPut("edit/{id}")]
        // // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> AddOrEdit(int id, [Bind("Id,SellRent,Name,Address,Address2")]
        //     Propperty propData)
        // {
        //     bool IsPropExist = false;

        //     Propperty property = await uow.PropertyRepository.FindProperty(id);

        //     if (property != null)
        //     {
        //         IsPropExist = true;
        //     }
        //     else
        //     {
        //         property = new Propperty();
        //     }


        //     try
        //     {
        //         property.Name = propData.Name;
        //         property.Address = propData.Address;
        //         property.Address2 = propData.Address2;

        //         if (IsPropExist)
        //         {
        //             await uow.PropertyRepository.UpdatePropperty(property);
        //         }
        //         else
        //         {
        //             uow.PropertyRepository.AddProperty(property);
        //         }
        //         await uow.SaveAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         throw;
        //     }
        //     return new JsonResult("Success");
        // }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> UpdateProperty(Propperty prop)
        {
            await uow.PropertyRepository.UpdatePropperty(prop);
            return new OkResult();
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