using AutoMapper;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Areas.SysConfig.Models.ShowModels;
using PSI.Core.Entities;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Mappers
{
    public class ContractControllerMapper
    {
        public ContractControllerMapper()
        {
        }


        public IMapper GetMapperOfOnlineInfo<T1, T2>()
        {
            switch ((typeof(T1).Name, typeof(T2).Name))
            {
                case (nameof(CustomerInfo), nameof(VE_CustomerInfo)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerInfo, VE_CustomerInfo>()
                        .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                        .ForMember(tar => tar.CustomerName, s => s.MapFrom(ss => ss.CUSTOMER_NAME))
                       ).CreateMapper();
                case (nameof(CustomerContract), nameof(VE_CustomerContract)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerContract, VE_CustomerContract>()
                        .ForMember(tar => tar.ContractGUID, s => s.MapFrom(ss => ss.CONTRACT_GUID))
                        .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                        .ForMember(tar => tar.ContractName, s => s.MapFrom(ss => ss.CONTRACT_NAME))
                        .ForMember(tar => tar.ContractType, s => s.MapFrom(ss => ss.CONTRACT_TYPE))
                        .ForMember(tar => tar.DealUnitPrice, s => s.MapFrom(ss => ss.DEAL_UNIT_PRICE))
                        .ForMember(tar => tar.DealWeight, s => s.MapFrom(ss => ss.DEAL_WEIGHT))
                        .ForMember(tar => tar.ActualWeight, s => s.MapFrom(ss => ss.ACTUAL_WEIGHT))
                        .ForMember(tar => tar.StartDatetime, s => s.MapFrom(ss => ss.START_DATETIME))
                        .ForMember(tar => tar.EndDatetime, s => s.MapFrom(ss => ss.END_DATETIME))
                       ).CreateMapper();
                default:
                    return null;
            }
        }

        public IMapper GetMapperOfCreateContractInfo<T1, T2>()
        {
            switch ((typeof(T1).Name, typeof(T2).Name))
            {
                case (nameof(PageContractCreateContractInfo), nameof(CustomerContract)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<PageContractCreateContractInfo, CustomerContract>()
                        .ForMember(tar => tar.CONTRACT_NAME, s => s.MapFrom(ss => ss.ContractName))
                        .ForMember(tar => tar.DEAL_WEIGHT, s => s.MapFrom(ss => ss.DealWeight))
                        .ForMember(tar => tar.DEAL_UNIT_PRICE, s => s.MapFrom(ss => ss.DealUnitPrice))
                        .ForMember(tar => tar.CUSTOMER_GUID, s => s.MapFrom(ss => ss.CustomerGUID))
                        .ForMember(tar => tar.PRODUCT_GUID, s => s.MapFrom(ss => ss.ProductGUID))
                        .ForMember(tar => tar.START_DATETIME, s => s.MapFrom(ss => ss.StratTime))
                        .ForMember(tar => tar.END_DATETIME, s => s.MapFrom(ss => ss.EndTime))
                        .ForMember(tar => tar.CONTRACT_TYPE, s => s.MapFrom(ss => ss.ContractType))
                        .ForMember(tar => tar.REMARK, s => s.MapFrom(ss => ss.Remark))
                        .ForMember(tar => tar.IS_EFFECTIVE, s => s.MapFrom(ss => "1"))
                        .ForMember(tar => tar.ACTUAL_WEIGHT, s => s.MapFrom(ss => 0))
                       ).CreateMapper();
                default:
                    return null;
            }
        }

        public IMapper GetMapperOfEditCustomerContract<T1, T2>()
        {
            switch ((typeof(T1).Name, typeof(T2).Name))
            {
                case (nameof(CustomerContract), nameof(PageContractEditCustomerContract)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerContract, PageContractEditCustomerContract>()
                        .ForMember(tar => tar.ContractName, s => s.MapFrom(ss => ss.CONTRACT_NAME))
                        .ForMember(tar => tar.DealWeight, s => s.MapFrom(ss => ss.DEAL_WEIGHT))
                        .ForMember(tar => tar.DealUnitPrice, s => s.MapFrom(ss => ss.DEAL_UNIT_PRICE))
                        .ForMember(tar => tar.CustomerGUID, s => s.MapFrom(ss => ss.CUSTOMER_GUID))
                        .ForMember(tar => tar.ProductGUID, s => s.MapFrom(ss => ss.PRODUCT_GUID))
                        .ForMember(tar => tar.StratTime, s => s.MapFrom(ss => ss.START_DATETIME))
                        .ForMember(tar => tar.EndTime, s => s.MapFrom(ss => ss.END_DATETIME))
                        .ForMember(tar => tar.ContractType, s => s.MapFrom(ss => ss.CONTRACT_TYPE))
                        .ForMember(tar => tar.Remark, s => s.MapFrom(ss => ss.REMARK))
                        .ForMember(tar => tar.ActualWeight, s => s.MapFrom(ss => ss.ACTUAL_WEIGHT))
                       ).CreateMapper();
                default:
                    return null;
            }
        }


    }
}
