using AutoMapper;
using PSI.Areas.SysConfig.Models;
using PSI.Areas.SysConfig.Models.PageModels;
using PSI.Core.Entities;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Mappgins.APIMapping
{
    public class API_CustomerContractsMapper
    {


        public API_CustomerContractsMapper()
        {
        }


        public IMapper GetMapperOfGet<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(CustomerContract), nameof(VE_CustomerContract)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerContract, VE_CustomerContract>()
                        .ForMember(tar => tar.DealWeight, s => s.MapFrom(ss => ss.DEAL_WEIGHT))
                        .ForMember(tar => tar.DealUnitPrice, s => s.MapFrom(ss => ss.DEAL_UNIT_PRICE))
                       ).CreateMapper();
                default:
                    return null;
            }

        }

        public IMapper GetMapperOfGetContractsByCustomerUNID<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(CustomerContract), nameof(VE_CustomerContract)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerContract, VE_CustomerContract>()
                        .ForMember(tar => tar.ContractGUID, s => s.MapFrom(ss => ss.CONTRACT_GUID))
                        .ForMember(tar => tar.ContractName, s => s.MapFrom(ss => ss.CONTRACT_NAME))
                       ).CreateMapper();
                default:
                    return null;
            }

        }


    }
}
