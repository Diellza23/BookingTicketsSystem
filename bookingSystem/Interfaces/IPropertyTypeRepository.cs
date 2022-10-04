using System.Collections.Generic;
using System.Threading.Tasks;
using bookingSystem.Models;

namespace bookingSystem.Interfaces
{
    public interface IPropertyTypeRepository
    {
         Task<IEnumerable<PropertyType>> GetPropertyTypesAsync();
    }
}