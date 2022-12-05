using AutoMapper;
using PSI.Helpers.IHelper;
using System.Collections.Generic;

namespace PSI.Helpers
{
    public class MapperHelper : IMapperHelper
    {
        private readonly IMapperAllConfig _iMapperAllConfig;
        public MapperHelper(IMapperAllConfig iMapperAllConfig)
        {
            _iMapperAllConfig = iMapperAllConfig;
        }
        public MapperHelper()
        {
            _iMapperAllConfig = new MapperAllConfig();
        }

        public TargetType MapTo<SourceType, TargetType>(SourceType srcData, int mapType = 0)
            where SourceType : class
           where TargetType : class
        {
            var mapperConfigRs = GetMapperConfig<SourceType, TargetType>(mapType);
            return mapperConfigRs.Map<TargetType>(srcData);
        }

        public List<TargetType> MapTo<SourceType, TargetType>(List<SourceType> srcData, int mapType = 0)
            where SourceType : class
            where TargetType : class
        {
            var mapperConfigRs = GetMapperConfig<SourceType, TargetType>(mapType);
            return mapperConfigRs.Map<List<TargetType>>(srcData);
        }

        private IMapper GetMapperConfig<SourceType, TargetType>(int mapType = 0)
            where SourceType : class
            where TargetType : class
        {
            var adapterConfigRs = _iMapperAllConfig.FindConfig<SourceType, TargetType>(mapType);
            return adapterConfigRs;
        }
    }
}
