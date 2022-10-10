using System.Threading.Tasks;
using bookingSystem.Data.Repo;
using bookingSystem.Interfaces;
using Claim.Data;
// using bookingSystem.Data;

namespace bookingSystem.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDBContext dc;

        public UnitOfWork(AppDBContext dc)
        {
            this.dc = dc;
        }
        public ICityRepository CityRepository =>
        new CityRepository(dc);

        public IPropertyRepository PropertyRepository =>
        new PropertyRepository(dc);

        public IPropertyTypeRepository PropertyTypeRepository =>
        new PropertyTypeRepository(dc);

        public IFurnishingTypeRepository FurnishingTypeRepository =>
        new FurnishingTypeRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}