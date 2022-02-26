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
                .ForMember(tar => tar.CustomerId, s => s.MapFrom(ss => ss.CustomerId))
                 .ForMember(tar => tar.CarName, s => s.MapFrom(ss => ss.CustomerId))
                 .ForMember(tar => tar.CustomerId, s => s.MapFrom(ss => ss.CustomerId));
            //.ConstructUsing(parentDto => new PageWeightNoteEditWeightNote());

        }
    }
}
