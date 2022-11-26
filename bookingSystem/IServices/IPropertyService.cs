using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Entities;
using DTO;

namespace IService
{
    public interface IPropertyService
    {
        Task<Property> AddUpdateProperty(int id, string name, string propertyType, string furnishingType, int price, int builtArea, string address, string address2, string city, string country, int floorNo, int totalFloors, bool readyToMove, string mainEntrance, int security, int maintenance, string description, string authorId, bool publish);
        Task<bool> DeleteProperty(int id);
        Task<List<PropertyDTO>> GetAllProperties(string authorId);

    }
}