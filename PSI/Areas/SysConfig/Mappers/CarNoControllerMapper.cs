using AutoMapper;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Core.Entities;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Mappers
{
    public class CarNoControllerMapper
    {
        public CarNoControllerMapper()
        {
        }

        public IMapper GetPageCustomerEditCustomerInfoMapper<T1>() where T1 : CustomerInfo
        {
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

        public IMapper GetMapperOfOnlineInfo<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(CustomerCar), nameof(VE_CustomerCar)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerCar, VE_CustomerCar>()
                        .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                        .ForMember(tar => tar.CarGUID, s => s.MapFrom(ss => ss.CAR_GUID))
                        .ForMember(tar => tar.CarName, s => s.MapFrom(ss => ss.CAR_NAME))
                        .ForMember(tar => tar.IsEffective, s => s.MapFrom(ss => ss.IS_EFFECTIVE))
                        .ForMember(tar => tar.Remark, s => s.MapFrom(ss => ss.REMARK))
                       ).CreateMapper();

                case (nameof(CustomerCar), nameof(PageCustomer_GetCarNoInfoModel)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerCar, PageCustomer_GetCarNoInfoModel>()
                        .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                        .ForMember(tar => tar.CarGUID, s => s.MapFrom(ss => ss.CAR_GUID))
                        .ForMember(tar => tar.CarName234, s => s.MapFrom(ss => ss.CAR_NAME))
                        .ForMember(tar => tar.IsEffective, s => s.MapFrom(ss => ss.IS_EFFECTIVE))
                        .ForMember(tar => tar.Remark, s => s.MapFrom(ss => ss.REMARK))
                       ).CreateMapper();
                default:
                    return null;
            }


            //switch (actionName)
            //{
            //    case nameof(CarNoController.OnlineInfo):
            //        switch ((typeof(T1).Name, typeof(T2).Name))
            //        {
            //            case (nameof(CustomerCar), nameof(VE_CustomerCar)):
            //                return new MapperConfiguration(cfg =>
            //                cfg.CreateMap<CustomerCar, PageCustomer_GetCarNoInfoModel>()
            //                    .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
            //                    .ForMember(tar => tar.CarGUID, s => s.MapFrom(ss => ss.CAR_GUID))
            //                    .ForMember(tar => tar.CarName, s => s.MapFrom(ss => ss.CAR_NAME))
            //                    .ForMember(tar => tar.IsEffective, s => s.MapFrom(ss => ss.IS_EFFECTIVE))
            //                    .ForMember(tar => tar.Remark, s => s.MapFrom(ss => ss.REMARK))
            //                   ).CreateMapper();
            //            default:
            //                return null;
            //        }
            //    default:
            //        return null;
            //}
        }


        public IMapper GetMapperOfCreateCarNoInfo<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(PageCreateCarNoInfo), nameof(CustomerCar)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<PageCreateCarNoInfo, CustomerCar>()
                        .ForMember(tar => tar.CUSTOMER_GUID, s => s.MapFrom(ss => ss.CustomerGUID))
                        .ForMember(tar => tar.CAR_GUID, s => s.MapFrom(ss => ss.CarGUID))
                        .ForMember(tar => tar.CAR_NAME, s => s.MapFrom(ss => ss.CarName234))
                        .ForMember(tar => tar.IS_EFFECTIVE, s => s.MapFrom(ss => ss.IsEffective))
                        .ForMember(tar => tar.REMARK, s => s.MapFrom(ss => ss.Remark))
                       ).CreateMapper();
                default:
                    return null;
            }


        }



    }
}
