using System.Threading.Tasks;

namespace bookingSystem.Interfaces
{
    public interface IUnitOfWork
    {
        ICityRepository CityRepository { get; }
        IPropertyRepository PropertyRepository { get; }
        IPropertyTypeRepository PropertyTypeRepository { get; }
        IFurnishingTypeRepository FurnishingTypeRepository { get; }
        Task<bool> SaveAsync();

    }
}