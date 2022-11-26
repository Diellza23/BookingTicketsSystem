using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Claim.Data;
using Data.Entities;
using DTO;
using IService;
using Microsoft.EntityFrameworkCore;

namespace Service
{
    public class PropertyService : IPropertyService
    {
        private readonly AppDBContext _context;
        public PropertyService(AppDBContext context)
        {
            _context = context;
        }
        public async Task<Property> AddUpdateProperty(int id, string name, string propertyType, string furnishingType, int price, int builtArea, string address, string address2, string city, string country, int floorNo, int totalFloors, bool readyToMove, string mainEntrance, int security, int maintenance, string description, string authorId, bool publish)
        {
            var tempProperty = _context.Properties.FirstOrDefault(x => x.Id == id);
            if (tempProperty == null)
            {
                tempProperty = new Property()
                {
                    Name = name,
                    PropertyType = propertyType,
                    FurnishingType = furnishingType,
                    Price = price,
                    BuiltArea = builtArea,
                    Address = address,
                    Address2 = address2,
                    City = city,
                    Country = country,
                    FloorNo = floorNo,
                    TotalFloors = totalFloors,
                    ReadyToMove = readyToMove,
                    MainEntrance = mainEntrance,
                    Security = security,
                    Maintenance = maintenance,
                    DateOfPossession = DateTime.UtcNow,
                    Description = description,
                    AppUserId = authorId,
                    Created = DateTime.UtcNow,
                    Modified = DateTime.UtcNow,
                    Publish = publish

                };
                await _context.Properties.AddAsync(tempProperty);
                await _context.SaveChangesAsync();
                return tempProperty;
            }
            tempProperty.Name = name;
            tempProperty.PropertyType = propertyType;
            tempProperty.FurnishingType = furnishingType;
            tempProperty.Price = price;
            tempProperty.BuiltArea = builtArea;
            tempProperty.Address = address;
            tempProperty.Address2 = address2;
            tempProperty.City = city;
            tempProperty.Country = country;
            tempProperty.FloorNo = floorNo;
            tempProperty.TotalFloors = totalFloors;
            tempProperty.ReadyToMove = readyToMove;
            tempProperty.MainEntrance = mainEntrance;
            tempProperty.Security = security;
            tempProperty.Maintenance = maintenance;
            tempProperty.Description = description;

            tempProperty.Publish = publish;

            _context.Update(tempProperty);
            await _context.SaveChangesAsync();
            return tempProperty;
        }

        public async Task<bool> DeleteProperty(int id)
        {
            var tempProperty = _context.Properties.FirstOrDefault(x => x.Id == id);
            if (tempProperty == null)
                return await Task.FromResult(true);

            _context.Properties.Remove(tempProperty);
            await _context.SaveChangesAsync();
            return await Task.FromResult(true);
        }

        public async Task<List<PropertyDTO>> GetAllProperties(string authorId)
        {
            return await (
                from property in _context.Properties
                where property.AppUserId == authorId
                select new PropertyDTO()
                {
                    Name = property.Name,
                    PropertyType = property.PropertyType,
                    FurnishingType = property.FurnishingType,
                    Price = property.Price,
                    BuiltArea = property.BuiltArea,
                    Address = property.Address,
                    Address2 = property.Address2,
                    City = property.City,
                    Country = property.Country,
                    FloorNo = property.FloorNo,
                    TotalFloors = property.TotalFloors,
                    ReadyToMove = property.ReadyToMove,
                    MainEntrance = property.MainEntrance,
                    Security = property.Security,
                    Maintenance = property.Maintenance,
                    Description = property.Description,
                    Publish = property.Publish,
                    AppUserId = property.AppUserId,
                    AuthorName = property.AppUser.FullName,
                    Created = property.Created,
                }
            ).ToListAsync();


        }
    }
}