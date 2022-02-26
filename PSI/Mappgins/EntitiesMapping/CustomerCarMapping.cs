using AutoMapper;
using PSI.Areas.Purchase.Models.IVE_Models;
using PSI.Areas.Purchase.Models.PageModels;
using PSI.Areas.SysConfig.Models.ShowModels;
using PSI.Core.Entities;

namespace PSI.Mappings.EntitiesMappging
{
    public class CustomerCarMapping : Profile
    {
        public CustomerCarMapping()
        {

            //CreateMap<CustomerCar, Show_CustomerCar>()
            //    .ForMember(tar => tar.CustomerId, s => s.MapFrom(ss => ss.CustomerId))
            //     .ForMember(tar => tar.CarName, s => s.MapFrom(ss => ss.CustomerId))
            //     .ForMember(tar => tar.CustomerId, s => s.MapFrom(ss => ss.CustomerId))
            //     .ReverseMap();


            //CreateMap<CustomerCar, Show_CustomerCar>()
            //   .ForMember(tar => tar.CustomerId, s => s.MapFrom(ss => ss.CustomerId))
            //    .ForMember(tar => tar.CarName, s => s.MapFrom(ss => ss.CustomerId))
            //    .ForMember(tar => tar.CustomerId, s => s.MapFrom(ss => ss.CustomerId))
            //    .ReverseMap();

        }
    }
}
