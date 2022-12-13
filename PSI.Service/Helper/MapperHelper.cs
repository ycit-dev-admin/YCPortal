using AutoMapper;
using PSI.Service.Helper.IHelper;
using System.Collections.Generic;

namespace PSI.Service.Helper
{
    public class MapperHelper : IMapperHelper
    {
        private readonly IMapperAllConfig _iMapperAllConfig;
        public MapperHelper(IMapperAllConfig iMapperAllConfig)
        {
            _iMapperAllConfig = iMapperAllConfig;
        }
        //public MapperHelper()
        //{
        //    _iMapperAllConfig = new MapperAllConfig();
        //}

        public TargetType MapTo<SourceType, TargetType>(SourceType srcData, int mapType = 0)
            where SourceType : class
           where TargetType : class
        {
            var mapperConfigRs = GetMapperConfig<SourceType>(mapType);
            return mapperConfigRs.Map<TargetType>(srcData);
        }

        public List<TargetType> MapTo<SourceType, TargetType>(List<SourceType> srcData, int mapType = 0)
            where SourceType : class
            where TargetType : class
        {
            var mapperConfigRs = GetMapperConfig<SourceType>(mapType);
            return mapperConfigRs.Map<List<TargetType>>(srcData);
        }

        private IMapper GetMapperConfig<SourceType>(int mapType = 0)
            where SourceType : class
        {
            var adapterConfigRs = _iMapperAllConfig.FindConfig<SourceType>(mapType);
            return adapterConfigRs;
        }
    }
}
