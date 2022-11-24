using System.Collections.Generic;
using System.Threading.Tasks;
using bookingSystem.Models;

namespace bookingSystem.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Propperty>> GetPropertiesAsync(int sellRent);
        Task<Propperty> GetPropertyDetailAsync(int id);

        Task<Propperty> GetPropertyByIdAsync(int id);
        void AddProperty(Propperty property);
        Task<Propperty> UpdatePropperty(Propperty objPropperty);
        void DeleteProperty(int id);
        Task GetPropertiesAsync();

        Task<IEnumerable<Propperty>> GetProperties();
        Task<Propperty> FindProperty(int id);

        Task<Propperty> CreatePropperty(Propperty property);


        Task<Propperty> InsertProperty(Propperty objPropperty);


    }

}