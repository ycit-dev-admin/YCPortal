using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Models.DTOModels;
using PSI.Service.IService;
using PSI.Service.MapActions;

namespace PSI.Service.Mappings
{
    public class DTOModelMappingProfile : Profile
    {

        public DTOModelMappingProfile()
        {
            // DTOModel -> Entity
            this.CreateMap<DTO_SalesIngredient, SalesIngredient>()
                .ForMember(tar => tar.PRODUCT_UNID, ss => ss.MapFrom(src => src.PRODUCT_UNID))
                .ForMember(tar => tar.CREATE_TIME, ss => ss.MapFrom(src => DateTime.Now))
                .ForMember(tar => tar.UPDATE_TIME, ss => ss.MapFrom(src => DateTime.Now));


            this.CreateMap<DTO_SalesWeightNote, S_WeightNote>()
               .AfterMap<TestAction>();




            // DTOModel -> Entity
            //this.CreateMap<CardDataModel, CardResultModel>();
        }
    }


}
