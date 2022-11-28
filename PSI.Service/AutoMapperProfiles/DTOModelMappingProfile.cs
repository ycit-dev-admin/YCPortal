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
            this.CreateMap<DTO_SalesIngredient, SalesIngredient>();  // test


            this.CreateMap<DTO_SalesWeightNote, SalesWeightNote>()
               .AfterMap<TestAction>();




            // DTOModel -> Entity
            //this.CreateMap<CardDataModel, CardResultModel>();
        }
    }


}
