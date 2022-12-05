using AutoMapper;
using PSI.Areas.Purchase.Models.PageModels;
using PSI.Helpers.IHelper;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace PSI.Helpers
{
    public class MapperConfig : IMapperConfig
    {

        public MapperConfig()
        {

        }

        public Dictionary<(Type, Type, int), IMapper> GetConfig<SrcType>()
        {
            // 取得泛型中的類型型態
            Dictionary<(Type, Type, int), IMapper> rsDic = new Dictionary<(Type, Type, int), IMapper>();
            var srcType = typeof(SrcType);

            var instanceTypeDic = GetInstanceTypeDic();
            var instanceType = instanceTypeDic[typeof(SrcType)];

            var wowInsetance = Activator.CreateInstance(instanceType);
            MethodInfo method = instanceType.GetMethod(nameof(IMapperConfigAction.GetConfigDic));
            var funRs = method.Invoke(wowInsetance, null);
            rsDic = funRs as Dictionary<(Type, Type, int), IMapper>;
            return rsDic;

        }


        private Dictionary<Type, Type> GetInstanceTypeDic()
        {
            var instanceTypeDic = new Dictionary<Type, Type>
            {
                { typeof(WeightNoteCreateWeightNote), typeof(WeightNoteCreateWeightNote_MapperConfig) }
                //,                { typeof(Sys_Show_199BOM), typeof(SysShow199BOM_MapperConfig) }
            };

            return instanceTypeDic;
        }
    }
}
