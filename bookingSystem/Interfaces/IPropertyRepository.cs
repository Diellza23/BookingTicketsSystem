using System.Collections.Generic;
using System.Threading.Tasks;
using bookingSystem.Models;

namespace bookingSystem.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Propperty>> GetPropertiesAsync(int sellRent);
        Task<Propperty> GetPropertyDetailAsync(int id);

        void AddProperty(Propperty property);
        void DeleteProperty(int id);
        Task GetPropertiesAsync();

        Task<IEnumerable<Propperty>> GetProperties();


    }
}