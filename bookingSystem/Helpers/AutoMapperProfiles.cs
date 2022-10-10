using AutoMapper;
using bookingSystem.Dtos;
using bookingSystem.Models;

namespace bookingSystem.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<City, CityUpdateDto>().ReverseMap();
            CreateMap<Propperty, PropertyDto>().ReverseMap();


            CreateMap<Propperty, PropertyListDto>()
            .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
            .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
            .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
            .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name));

            CreateMap<Propperty, PropertyDetailDto>()
           .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
           .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
           .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
           .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name));

            CreateMap<PropertyType, KeyValuePairDto>().ReverseMap();
            CreateMap<FurnishingType, KeyValuePairDto>();
        }
    }
}