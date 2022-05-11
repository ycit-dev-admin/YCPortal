using AutoMapper;
using PSI.Areas.SysConfig.Models.ShowModels;
using PSI.Core.Entities;

namespace PSI.Areas.SysConfig.Mappings.ShowModels
{
    public class ShowCustomerMapping : Profile
    {
        public ShowCustomerMapping()
        {
            CreateMap<CustomerCar, Show_CustomerCar>()
                .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                 .ForMember(tar => tar.CarGUID, s => s.MapFrom(ss => ss.CAR_GUID))
                 .ForMember(tar => tar.CarName, s => s.MapFrom(ss => ss.CAR_NAME));
            //.ConstructUsing(parentDto => new PageWeightNoteEditWeightNote());

        }
    }
}
