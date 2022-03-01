using AutoMapper;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Areas.SysConfig.Models.ShowModels;
using PSI.Core.Entities;

namespace PSI.Areas.Purchase.Helpers
{
    public class SysConfigMapperHelper
    {
        public SysConfigMapperHelper()
        {
        }

        public IMapper GetPageCustomerEditCustomerInfoMapper<T1>() where T1 : CustomerInfo
        {
            #region --CustomerInfo --        
            if (typeof(T1) == typeof(CustomerInfo))
                return new MapperConfiguration(cfg =>
                cfg.CreateMap<CustomerInfo, PageCustomerEditCustomerInfo>()
               .ForMember(x => x.CompanyName, y => y.MapFrom(o => o.CompanyName))
               .ForMember(x => x.CustomerName, y => y.MapFrom(o => o.CustomerName))
               .ForMember(x => x.TaxId, y => y.MapFrom(o => o.TaxId))
               .ForMember(x => x.PsiType, y => y.MapFrom(o => o.PsiType))
               .ForMember(x => x.Remark, y => y.MapFrom(o => o.Remark))).CreateMapper();
            #endregion

            return null;
        }

        public IMapper GetShowCustomerCarMapper<T1>() where T1 : CustomerCar
        {
            #region --CustomerCar --        
            if (typeof(T1) == typeof(CustomerCar))
                return new MapperConfiguration(cfg =>
                cfg.CreateMap<CustomerCar, Show_CustomerCar>()
               .ForMember(x => x.CustomerId, y => y.MapFrom(o => o.CustomerId))
               .ForMember(x => x.CarName, y => y.MapFrom(o => o.CarName))).CreateMapper();
            #endregion

            return null;
        }
        public IMapper GetEntityCustomerInfo<T1>() where T1 : PageCustomerEditCustomerInfo
        {
            #region --PageCustomerEditCustomerInfo --        
            if (typeof(T1) == typeof(PageCustomerEditCustomerInfo))
                return new MapperConfiguration(cfg =>
                cfg.CreateMap<PageCustomerEditCustomerInfo, CustomerInfo>()
               .ForMember(t => t.Id, s => s.MapFrom(ss => long.Parse(ss.EncodeSn)))
               .ForMember(t => t.CompanyName, s => s.MapFrom(ss => ss.EditCompanyName))
               .ForMember(t => t.TaxId, s => s.MapFrom(ss => ss.EditTaxId))
               .ForMember(t => t.CustomerName, s => s.MapFrom(ss => ss.EditCustomerName))
               .ForMember(t => t.PsiType, s => s.MapFrom(ss => ss.EditPsiType))
               .ForMember(t => t.Remark, s => s.MapFrom(ss => ss.EditRemark))
               ).CreateMapper();
            #endregion

            return null;
        }

    }
}
