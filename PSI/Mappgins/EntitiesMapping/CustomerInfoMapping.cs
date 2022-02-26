using AutoMapper;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Core.Entities;

namespace PSI.Mappings.EntitiesMappging
{
    public class CustomerInfoMapping : Profile
    {
        public CustomerInfoMapping()
        {
            CreateMap<CustomerInfo, Show_CustomerInfo>()
                 .ForMember(tar => tar.Id, s => s.MapFrom(ss => ss.Id))
                 .ForMember(tar => tar.CompanyName, s => s.MapFrom(ss => ss.CompanyName))
                 .ForMember(tar => tar.CustomerName, s => s.MapFrom(ss => ss.CustomerName))
                 .ForMember(tar => tar.UpdateTime, s => s.MapFrom(ss => ss.UpdateTime))
                 .ForMember(tar => tar.UpdateEmpNo, s => s.MapFrom(ss => ss.UpdateEmpNo))
                 .ReverseMap();

            CreateMap<CustomerInfo, PageCustomerEditCustomerInfo>()
                .ForMember(tar => tar.CompanyName, s => s.MapFrom(ss => ss.CompanyName))
                 .ForMember(tar => tar.TaxId, s => s.MapFrom(ss => ss.TaxId))
                 .ForMember(tar => tar.CustomerName, s => s.MapFrom(ss => ss.CustomerName))                 
                 .ForMember(tar => tar.PsiType, s => s.MapFrom(ss => ss.Address))
                 .ForMember(tar => tar.Remark, s => s.MapFrom(ss => ss.Remark))
                 .ReverseMap();

        }
    }
}
