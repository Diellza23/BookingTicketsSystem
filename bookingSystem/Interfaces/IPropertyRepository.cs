using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using bookingSystem.Models;
using DTO;

namespace bookingSystem.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Propperty>> GetPropertiesAsync(int sellRent);
        Task<Propperty> GetPropertyDetailAsync(int id);

        Task<Propperty> GetPropertyByIdAsync(int id);
        // void AddProperty(Propperty property);


        //new ones keto me devbugfix
        Task<Propperty> AddUpdateProperty(int id, int sellRent, string name, int propertyTypeId, int furnishingTypeId, int price, int bhk, int builtArea, int cityId, bool readyToMove, int carpetArea, string address, string address2, int floorNo, int totalFloors, string mainEntrance, int security, bool gated, int maintenance, DateTime estPossessionOn, string description, string authorId);
        Task<List<PropertyDTO>> GetAllProperties(string authorId);

        Task<bool> DeleteProperty(int id);



        Task<Propperty> UpdatePropperty(int id, int sellRent, string name, int propertyTypeId, int furnishingTypeId, int price, int bhk, int builtArea, int cityId, bool readyToMove, int carpetArea, string address, string address2, int floorNo, int totalFloors, string mainEntrance, int security, bool gated, int maintenance, DateTime estPossessionOn, string description, string authorId);
        // void DeleteProperty(int id);
        Task GetPropertiesAsync();

        Task<IEnumerable<Propperty>> GetProperties();
        Task<Propperty> FindProperty(int id);

        Task<Propperty> CreatePropperty(Propperty property);


        Task<Propperty> InsertProperty(Propperty objPropperty);


    }

}