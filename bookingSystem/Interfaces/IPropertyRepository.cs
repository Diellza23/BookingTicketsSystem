using System.Collections.Generic;
using System.Threading.Tasks;
using bookingSystem.Models;

namespace bookingSystem.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Propperty>> GetPropertiesAsync(int sellRent);
        Task<Propperty> GetPropertyDetailAsync(int id);

        void AddProperty(PropertyType property);
        void DeleteProperty(int id);
        Task GetPropertiesAsync();


    }
}