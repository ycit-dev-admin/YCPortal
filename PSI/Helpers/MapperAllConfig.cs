using AutoMapper;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Helpers.IHelper;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PSI.Helpers
{
    public class MapperAllConfig : IMapperAllConfig
    {
        private readonly IMapperConfig _iMapperConfig;

        private Dictionary<(Type, Type, int), IMapper> _allMapConfigs;
        public MapperAllConfig(IMapperConfig iMapperConfig)
        {
            _iMapperConfig = iMapperConfig;
            _allMapConfigs = GetAllMapperConfig();
        }
        public MapperAllConfig()
        {
            _iMapperConfig = new MapperConfig();
            _allMapConfigs = GetAllMapperConfig();
        }

        public IMapper FindConfig<SourceType, TargetType>(int mapType = 0)
            where SourceType : class
            where TargetType : class
        {
            return _allMapConfigs.FirstOrDefault(aa => aa.Key == (typeof(SourceType), typeof(TargetType), mapType)).Value;
        }

        private Dictionary<(Type, Type, int), IMapper> GetAllMapperConfig()
        {
            var concatRs = new Dictionary<(Type, Type, int), IMapper>()
                       .Concat(_iMapperConfig.GetConfig<WeightNoteCreateWeightNote>());

            var allMapConfigs = concatRs.ToDictionary(dic => dic.Key, dic => dic.Value);
            return allMapConfigs;
        }




    }
}
