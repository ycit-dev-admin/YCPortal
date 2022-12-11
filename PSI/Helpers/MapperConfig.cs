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
    public class MapperConfig : IMapperConfig
    {

        public MapperConfig()
        {

        }

        public Dictionary<(Type, Type, int), IMapper> GetAllMapperConfig()
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

        public Dictionary<(Type, Type, int), IMapper> GetConfig<SrcType>()
        {
            // 取得泛型中的類型型態
            Dictionary<(Type, Type, int), IMapper> rsDic = new Dictionary<(Type, Type, int), IMapper>();
            var srcType = typeof(SrcType);

            var instanceTypeDic = GetInstanceTypeDic_PageModel()
                                  .Concat(GetInstanceTypeDic_DTO())
                                  .Concat(GetInstanceTypeDic_Entity())
                                  .ToDictionary(dic => dic.Key, dic => dic.Value);


            var instanceType = instanceTypeDic[typeof(SrcType)];

            var wowInsetance = Activator.CreateInstance(instanceType);
            MethodInfo method = instanceType.GetMethod(nameof(IMapperConfigAction.GetConfigDic));
            var funRs = method.Invoke(wowInsetance, null);
            rsDic = funRs as Dictionary<(Type, Type, int), IMapper>;
            return rsDic;

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
                { typeof(DTO_PS_WriteOff_Log), typeof(DTO_PS_WreteOff_Record_MapperConfig) }
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
