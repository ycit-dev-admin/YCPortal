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




    }
}
