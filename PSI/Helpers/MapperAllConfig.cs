using AutoMapper;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Helpers.IHelper;
using PSI.Mappgins.DtoModels;
using PSI.Mappgins.PageModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace PSI.Helpers
{
    public class MapperAllConfig : IMapperAllConfig
    {
        private readonly IMapperConfig _iMapperConfig;

        private Dictionary<(Type, Type, int), IMapper> _allMapConfigs;
        public MapperAllConfig(IMapperConfig iMapperConfig)
        {
            _iMapperConfig = iMapperConfig;
            _allMapConfigs = GetAllMapperConfigV2();
        }
        public MapperAllConfig()
        {
            _iMapperConfig = new MapperConfig();
            _allMapConfigs = GetAllMapperConfigV2();
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
                       .Concat(_iMapperConfig.GetConfig<WeightNoteCreateWeightNote>())
                       .Concat(_iMapperConfig.GetConfig<DTO_PS_WriteOff_Log>());

            var allMapConfigs = concatRs.ToDictionary(dic => dic.Key, dic => dic.Value);
            return allMapConfigs;
        }

        public Dictionary<(Type, Type, int), IMapper> GetAllMapperConfigV2()
        {
            // 取得泛型中的類型型態
            //Dictionary<(Type, Type, int), IMapper> rsDic = new Dictionary<(Type, Type, int), IMapper>();


            var instanceTypeDic = GetInstanceTypeDic_PageModel()
                                  .Concat(GetInstanceTypeDic_DTO())
                                  .Concat(GetInstanceTypeDic_Entity())
                                  .ToDictionary(dic => dic.Key, dic => dic.Value);


            var funcRs = instanceTypeDic.SelectMany(dic =>
            {
                //var wowInsetance = Activator.CreateInstance(dic.Value);
                MethodInfo method = dic.Value.GetMethod(nameof(IMapperConfigAction.GetConfigDic));
                var funRs = method.Invoke(Activator.CreateInstance(dic.Value), null);
                return funRs as Dictionary<(Type, Type, int), IMapper>;
            }).ToDictionary(dic => dic.Key, dic => dic.Value);


            return funcRs;
        }

        private Dictionary<Type, Type> GetInstanceTypeDic_PageModel()
        {
            var instanceTypeDic = new Dictionary<Type, Type>
            {
                { typeof(WeightNoteCreateWeightNote), typeof(WeightNoteCreateWeightNote_MapperConfig) }
                //,                { typeof(Sys_Show_199BOM), typeof(SysShow199BOM_MapperConfig) }
            };

            return instanceTypeDic;
        }
        private Dictionary<Type, Type> GetInstanceTypeDic_DTO()
        {
            var instanceTypeDic = new Dictionary<Type, Type>
            {
                { typeof(DTO_PS_WriteOff_Log), typeof(DTO_PS_WreteOff_Record_MapperConfig) },
                { typeof(DTO_S_WeightNote_Ingredient), typeof(DTO_S_WeightNote_Ingredient_MapperConfig) },
                { typeof(DTO_P_Inventory), typeof(DTO_P_Inventory_MapperConfig) }

            };

            return instanceTypeDic;
        }
        private Dictionary<Type, Type> GetInstanceTypeDic_Entity()
        {
            var instanceTypeDic = new Dictionary<Type, Type>
            {
                //{ typeof(WeightNoteCreateWeightNote), typeof(WeightNoteCreateWeightNote_MapperConfig) }
                //,{ typeof(D), typeof(WeightNoteCreateWeightNote_MapperConfig) }
                //,                { typeof(Sys_Show_199BOM), typeof(SysShow199BOM_MapperConfig) }
            };

            return instanceTypeDic;
        }



    }
}
