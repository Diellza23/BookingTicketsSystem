using System.Collections.Generic;
using System.Threading.Tasks;
using bookingSystem.Interfaces;
using bookingSystem.Models;
using Claim.Data;
using Microsoft.EntityFrameworkCore;

namespace bookingSystem.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly AppDBContext dc;

        public CityRepository(AppDBContext dc)
        {
            this.dc = dc;
        }
        public void AddCity(City city)
        {
            dc.Cities.AddAsync(city);
        }

        public void DeleteCity(int CityId)
        {
            var city = dc.Cities.Find(CityId);
            dc.Cities.Remove(city);
        }

        public async Task<City> FindCity(int id)
        {
            return await dc.Cities.FindAsync(id);
        }
        

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
        }


    }
}