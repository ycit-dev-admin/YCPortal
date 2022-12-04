using System;
using System.Collections.Generic;
using AutoMapper;
using PSI.Areas.Purchase.Models.PageModels;
using PSI.Core.Entities;
using PSI.Service.IHelper;

namespace PSI.Helpers
{
    public class MapperHelper : IMapperHelper
    {
        private readonly IMapperConfig _iWeightNoteCreateWeightNoteConfig;
        private readonly IA1MapperConfig _iA1MapperConfig;


        public MapperHelper(IMapperConfig iWeightNoteCreateWeightNoteConfig,
            IA1MapperConfig iA1MapperConfig)
        {
            _iWeightNoteCreateWeightNoteConfig = iWeightNoteCreateWeightNoteConfig;
            _iA1MapperConfig = iA1MapperConfig;

            // new 
            //_sysEmitSapDataMapConfig = new SysEmitSapDataMapConfig();
        }

        public TargetType MapTo<SourceType, TargetType>(SourceType srcData, int mapType = 0)
            where SourceType : class
            where TargetType : class
        {
            _iWeightNoteCreateWeightNoteConfig.GetMapConfig(mapType);
            _iA1MapperConfig.GetMapConfig(mapType);
            //_iPageWeightNoteEditWeightNoteConfig.GetMapConfig(mapType);
            throw new NotImplementedException();
        }




    }
}
