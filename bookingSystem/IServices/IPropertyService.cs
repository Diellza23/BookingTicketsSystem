using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Entities;
using DTO;

namespace IService
{
    public interface IPropertyService
    {
        Task<bool> DeleteProperty(int id);
        Task<List<PropertyDTO>> GetAllProperties(string authorId);
    }
}