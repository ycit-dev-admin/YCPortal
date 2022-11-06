using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.IService;

namespace PSI.Service.Mappings
{
    public class PageModelMappings : Profile
    {
        public PageModelMappings()
        {
            this.CreateMap<WeightNoteCreateWeightNote, SalesWeightNote>()
                .ForMember(tar => tar.SCALE_NO, ss => ss.MapFrom(src => 1234567));
             
            // PageModel -> Entity
            //this.CreateMap<SalesWeightNote, CustomerCar>()
            //    .ForMember(tar => tar.CAR_NAME,
            //    arg => arg.MapFrom(src => iCustomerInfoService.GetCustomerInfo(src.CUSTOMER_UNID).CUSTOMER_NAME));  // test
            //this.CreateMap<CardSearchInfo, CardSearchCondition>();

            // DTOModel -> Entity
            //this.CreateMap<CardDataModel, CardResultModel>();
        }
    }


}
