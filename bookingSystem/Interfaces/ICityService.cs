using System.Collections.Generic;
using System.Threading.Tasks;
using bookingSystem.Models;

namespace bookingSystem.Interfaces
{
    public interface ICityService
    {
         Task<IEnumerable<City>> GetCitiesAsync();
         void AddCity(City city);

         void DeleteCity(int CityId);

         Task<City> FindCity(int id);

        //  Task<bool> SaveAsync();
    }
}