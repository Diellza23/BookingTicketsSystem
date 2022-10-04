using System.Collections.Generic;
using System.Threading.Tasks;
using bookingSystem.Models;

namespace bookingSystem.Interfaces
{
    public interface IFurnishingTypeRepository
    {
        Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync();
    }
}