using System.Collections.Generic;
using System.Threading.Tasks;
using bookingSystem.Models;
using Claim.Data;
using Microsoft.EntityFrameworkCore;
using bookingSystem.Interfaces;

namespace bookingSystem.Data.Repo
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly AppDBContext dc;

        public PropertyTypeRepository(AppDBContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<PropertyType>> GetPropertyTypesAsync()
        {
            return await dc.PropertyTypes.ToListAsync();
        }
    }
}