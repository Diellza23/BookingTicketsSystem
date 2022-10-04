using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using bookingSystem.Interfaces;
using bookingSystem.Models;
using Claim.Data;

namespace bookingSystem.Data.Repo
{
    public class FurnishingTypeRepository : IFurnishingTypeRepository
    {
        private readonly AppDBContext dc;

        public FurnishingTypeRepository(AppDBContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync()
        {
            return await dc.FurnishingTypes.ToListAsync();
        }
    }
}