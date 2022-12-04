using System;
using System.Collections.Generic;
using AutoMapper;
using PSI.Areas.Purchase.Models.PageModels;
using PSI.Core.Entities;
using PSI.Service.IHelper;

namespace PSI.Helpers
{
    public class A1MapperConfig : MapperConfig, IA1MapperConfig
    {

        public A1MapperConfig()
        {
            // new 
            //_sysEmitSapDataMapConfig = new SysEmitSapDataMapConfig();
        }

        //public IMapper GetMapConfig(int mapType)
        //{
        //    Dictionary<(Type, Type, int), IMapper> abc = null;

        //    //var mapConfigRs = new TypeAdapterConfig();
        //    //var dd =;


        //    abc.Add((typeof(WeightNoteCreateWeightNote), typeof(SalesWeightNote), mapType),
        //       new MapperConfiguration(cfg =>
        //            cfg.CreateMap<WeightNoteCreateWeightNote, SalesWeightNote>()
        //                .ForMember(tar => tar.SCALE_NO, s => s.MapFrom(ss => ss.Remark))
        //                ).CreateMapper());



        //    throw new NotImplementedException();
        //}
    }
}
