using System.Linq;
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
            CreateMap<PropertyType, PropertyTypeDto>().ReverseMap(); //u shtu
            CreateMap<City, CityUpdateDto>().ReverseMap();
            CreateMap<Propperty, PropertyDto>().ReverseMap();

            CreateMap<Photo, PhotoDto>().ReverseMap();

            // CreateMap<Propperty, PropertyUpdateDto>().ReverseMap(); //u shtu

            CreateMap<Propperty, PropertyListDto>()
            .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
            .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
            .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
            .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name))
            .ForMember(d => d.Photo, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsPrimary).ImageUrl))
            ;

            CreateMap<Propperty, PropertyDetailDto>()
           .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
           .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
           .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
           .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name));

            CreateMap<PropertyType, KeyValuePairDto>();
            CreateMap<FurnishingType, KeyValuePairDto>();
        }
    }
}