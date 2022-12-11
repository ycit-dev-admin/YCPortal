using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Helpers.IHelper;
using System;
using System.Collections.Generic;

namespace PSI.Mappgins.DtoModels
{
    public class DTO_PS_WreteOff_Record_MapperConfig : IMapperConfigAction
    {


        public DTO_PS_WreteOff_Record_MapperConfig()
        {

        }

        public Dictionary<(Type, Type, int), IMapper> GetConfigDic()
        {
            Dictionary<(Type, Type, int), IMapper> rsDic = new Dictionary<(Type, Type, int), IMapper>
            {
                {
                    (typeof(DTO_PS_WriteOff_Log), typeof(PS_WriteOff_Log), 0),
                  new MapperConfiguration(cfg =>
                    cfg.CreateMap<DTO_PS_WriteOff_Log, PS_WriteOff_Log>())
                       //.ForMember(tar => tar.PRODUCT_UNID, ss => ss.MapFrom(src => src.PRODUCT_UNID))
                       //.ForMember(tar => tar.CREATE_TIME, ss => ss.MapFrom(src => DateTime.Now))
                       //.ForMember(tar => tar.UPDATE_TIME, ss => ss.MapFrom(src => DateTime.Now)))
                    .CreateMapper()
                }

            };
            return rsDic;
        }
    }
}
