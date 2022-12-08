using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Helpers.IHelper;
using System;
using System.Collections.Generic;

namespace PSI.Mappgins.DtoModels
{
    public class DTO_P_Inventory_MapperConfig : IMapperConfigAction
    {


        public DTO_P_Inventory_MapperConfig()
        {

        }

        public Dictionary<(Type, Type, int), IMapper> GetConfigDic()
        {
            Dictionary<(Type, Type, int), IMapper> rsDic = new Dictionary<(Type, Type, int), IMapper>
            {
                {
                    (typeof(DTO_P_Inventory), typeof(PS_WriteOff_Log), 0),
                  new MapperConfiguration(cfg =>
                    cfg.CreateMap<DTO_P_Inventory, PS_WriteOff_Log>()
                       .ForMember(tar => tar.PRODUCT_UNID, ss => ss.MapFrom(src => src.PRODUCT_UNID))
                       //.ForMember(tar => tar.LIVEIN_UNIT_PRICE, ss => ss.MapFrom(src => src.UNIT_PRICE))
                       )
                       //.ForMember(tar => tar.CREATE_TIME, ss => ss.MapFrom(src => DateTime.Now))
                       //.ForMember(tar => tar.UPDATE_TIME, ss => ss.MapFrom(src => DateTime.Now)))
                    .CreateMapper()
                }

            };
            return rsDic;
        }
    }
}
