using AutoMapper;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Areas.SysConfig.Models.ShowModels;
using PSI.Core.Entities;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Mappers
{
    public class CustomerControllerMapper
    {
        public CustomerControllerMapper()
        {
        }


        public IMapper GetMapperOfEditCustomerInfo<T1, T2>()
        {
            switch ((typeof(T1).Name, typeof(T2).Name))
            {
                case (nameof(CustomerInfo), nameof(PageCustomerEditCustomerInfo)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerInfo, PageCustomerEditCustomerInfo>()
                        .ForMember(x => x.CustomerGuid, y => y.MapFrom(o => o.CUSTOMER_GUID))
                        .ForMember(x => x.CompanyName, y => y.MapFrom(o => o.COMPANY_NAME))
                        .ForMember(x => x.Address, y => y.MapFrom(o => o.ADDRESS))
                        .ForMember(x => x.ContentInfo, y => y.MapFrom(o => o.CONTENT_INFO))
                        .ForMember(x => x.CustomerName, y => y.MapFrom(o => o.CUSTOMER_NAME))
                        .ForMember(x => x.TaxId, y => y.MapFrom(o => o.TAX_ID))
                        .ForMember(x => x.PsiType, y => y.MapFrom(o => o.PSI_TYPE))
                        .ForMember(x => x.Remark, y => y.MapFrom(o => o.REMARK))
                       ).CreateMapper();
                case (nameof(CustomerCar), nameof(VE_CustomerCar)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerCar, VE_CustomerCar>()
                        .ForMember(x => x.CarGUID, y => y.MapFrom(o => o.CAR_GUID))
                        .ForMember(x => x.CustomerGUID, y => y.MapFrom(o => o.CUSTOMER_GUID))
                        .ForMember(x => x.CarName, y => y.MapFrom(o => o.CAR_NAME))
                       ).CreateMapper();
                default:
                    return null;
            }


            #region --CustomerInfo --        
            if (typeof(T1) == typeof(CustomerInfo))
                return new MapperConfiguration(cfg =>
                cfg.CreateMap<CustomerInfo, PageCustomerEditCustomerInfo>()
               .ForMember(x => x.CustomerGuid, y => y.MapFrom(o => o.CUSTOMER_GUID))
               .ForMember(x => x.CompanyName, y => y.MapFrom(o => o.COMPANY_NAME))
               .ForMember(x => x.CustomerName, y => y.MapFrom(o => o.CUSTOMER_NAME))
               .ForMember(x => x.TaxId, y => y.MapFrom(o => o.TAX_ID))
               .ForMember(x => x.PsiType, y => y.MapFrom(o => o.PSI_TYPE))
               .ForMember(x => x.Remark, y => y.MapFrom(o => o.REMARK))).CreateMapper();
            #endregion

            return null;
        }

        public IMapper GetPageCustomer_GetCarNoInfoModel<T1, T2>()
        {
            switch ((typeof(T1).Name, typeof(T2).Name))
            {
                case (nameof(CustomerCar), nameof(PageCustomer_GetCarNoInfoModel)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerCar, PageCustomer_GetCarNoInfoModel>()
                        .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                        .ForMember(tar => tar.CarGUID, s => s.MapFrom(ss => ss.CAR_GUID))
                        .ForMember(tar => tar.CarName, s => s.MapFrom(ss => ss.CAR_NAME))
                        .ForMember(tar => tar.IsEffective, s => s.MapFrom(ss => ss.IS_EFFECTIVE))
                        .ForMember(tar => tar.Remark, s => s.MapFrom(ss => ss.REMARK))
                       ).CreateMapper();
                default:
                    return null;
            }
        }



        public IMapper GetMapperOfOnlineInfo<T1, T2>()
        {
            switch ((typeof(T1).Name, typeof(T2).Name))
            {
                case (nameof(CustomerInfo), nameof(VE_CustomerInfo)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerInfo, VE_CustomerInfo>()
                        .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                        .ForMember(tar => tar.CompanyName, s => s.MapFrom(ss => ss.COMPANY_NAME))
                        .ForMember(tar => tar.CustomerName, s => s.MapFrom(ss => ss.CUSTOMER_NAME))
                        .ForMember(tar => tar.UpdateTime, s => s.MapFrom(ss => ss.UPDATE_TIME))
                        .ForMember(tar => tar.UpdateEmpNo, s => s.MapFrom(ss => ss.UPDATE_EMPNO))
                       ).CreateMapper();
                case (nameof(CustomerCar), nameof(VE_CustomerCar)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerCar, VE_CustomerCar>()
                        .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                        .ForMember(tar => tar.CarName, s => s.MapFrom(ss => ss.CAR_NAME))
                       ).CreateMapper();
                default:
                    return null;
            }
        }

        public IMapper GetMapperOfCreateCustomerInfo<T1, T2>()
        {
            switch ((typeof(T1).Name, typeof(T2).Name))
            {
                //case (nameof(CustomerInfo), nameof(VE_CustomerInfo)):
                //    return new MapperConfiguration(cfg =>
                //    cfg.CreateMap<CustomerInfo, VE_CustomerInfo>()
                //        .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                //        .ForMember(tar => tar.CompanyName, s => s.MapFrom(ss => ss.COMPANY_NAME))
                //        .ForMember(tar => tar.CustomerName, s => s.MapFrom(ss => ss.CUSTOMER_NAME))
                //        .ForMember(tar => tar.UpdateTime, s => s.MapFrom(ss => ss.UPDATE_TIME))
                //        .ForMember(tar => tar.UpdateEmpNo, s => s.MapFrom(ss => ss.UPDATE_EMPNO))
                //       ).CreateMapper();
                case (nameof(PageCustomerCreateCustomerInfo), nameof(CustomerInfo)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<PageCustomerCreateCustomerInfo, CustomerInfo>()
                       .ForMember(t => t.COMPANY_NAME, s => s.MapFrom(ss => ss.CompanyName))
                       .ForMember(t => t.TAX_ID, s => s.MapFrom(ss => ss.TaxId))
                       .ForMember(t => t.CUSTOMER_NAME, s => s.MapFrom(ss => ss.CustomerName))
                       .ForMember(t => t.PSI_TYPE, s => s.MapFrom(ss => ss.PsiType))
                       .ForMember(t => t.ADDRESS, s => s.MapFrom(ss => ss.Remark))
                       .ForMember(t => t.CONTENT_INFO, s => s.MapFrom(ss => ss.Remark))
                       .ForMember(t => t.REMARK, s => s.MapFrom(ss => ss.Remark))
                       ).CreateMapper();
                default:
                    return null;
            }
        }

        public IMapper GetMapperOfCustomerEditCustomerInfo<T1, T2>()
        {
            switch ((typeof(T1).Name, typeof(T2).Name))
            {
                case (nameof(PageCustomerEditCustomerInfo), nameof(CustomerInfo)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<PageCustomerEditCustomerInfo, CustomerInfo>()
                       .ForMember(t => t.CUSTOMER_GUID, s => s.MapFrom(ss => ss.CustomerGuid))
                       .ForMember(t => t.COMPANY_NAME, s => s.MapFrom(ss => ss.EditCompanyName))
                       .ForMember(t => t.TAX_ID, s => s.MapFrom(ss => ss.EditTaxId))
                       .ForMember(t => t.CUSTOMER_NAME, s => s.MapFrom(ss => ss.EditCustomerName))
                       .ForMember(t => t.PSI_TYPE, s => s.MapFrom(ss => ss.EditPsiType))
                        .ForMember(t => t.CONTENT_INFO, s => s.MapFrom(ss => ss.EditContentInfo))
                       .ForMember(t => t.ADDRESS, s => s.MapFrom(ss => ss.EditAddress))
                       .ForMember(t => t.REMARK, s => s.MapFrom(ss => ss.EditRemark))
                       ).CreateMapper();
                default:
                    return null;
            }
        }


    }
}
