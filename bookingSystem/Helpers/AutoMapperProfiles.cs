using AutoMapper;
using bookingSystem.Dtos;
using bookingSystem.Models;

namespace bookingSystem.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<City, CityUpdateDto>().ReverseMap();
        }
    }
}