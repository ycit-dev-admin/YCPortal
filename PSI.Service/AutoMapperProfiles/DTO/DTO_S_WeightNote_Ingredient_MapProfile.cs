using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using System;

namespace PSI.Service.AutoMapperProfiles.DTO
{
    public class DTO_S_WeightNote_Ingredient_MapProfile : Profile
    {

        public DTO_S_WeightNote_Ingredient_MapProfile()
        {
            // DTOModel -> Entity
            CreateMap<DTO_S_WeightNote_Ingredient, S_WeightNote_Ingredient>()
                .ForMember(tar => tar.PRODUCT_UNID, ss => ss.MapFrom(src => src.PRODUCT_UNID))
                .ForMember(tar => tar.CREATE_TIME, ss => ss.MapFrom(src => DateTime.Now))
                .ForMember(tar => tar.UPDATE_TIME, ss => ss.MapFrom(src => DateTime.Now));
        }
    }


}
