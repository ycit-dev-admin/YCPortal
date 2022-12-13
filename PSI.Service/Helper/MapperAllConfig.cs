using AutoMapper;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.AutoMapperProfiles.PageMoedl;
using PSI.Service.Helper.IHelper;
using PSI.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PSI.Service.Helper
{
    public class MapperAllConfig : IMapperAllConfig
    {
        //private readonly IMapperConfig _iMapperConfig;
        private readonly ISalesWeightNoteService _iSalesWeightNoteServic;

        private Dictionary<Type, MapModel> _allMapConfigs;
        public MapperAllConfig(ISalesWeightNoteService iSalesWeightNoteServic
            //,
            )
        {
            //_iMapperConfig = iMapperConfig;
            _iSalesWeightNoteServic = iSalesWeightNoteServic;
            _allMapConfigs = GetAllMapperConfigV3();
        }
        //public MapperAllConfig()
        //{
        //    //_iMapperConfig = new MapperConfig();
        //    _allMapConfigs = GetAllMapperConfigV2();
        //}

        public IMapper FindConfig<SourceType>(int mapType = 0)
            where SourceType : class
        {
            var mapModel = _allMapConfigs.FirstOrDefault(aa => aa.Key == (typeof(SourceType))).Value;
            var rsMapper = new MapperConfiguration(cfg =>
              {
                  var profile = (Profile)Activator.CreateInstance(mapModel.ProfileType,
                                mapModel.ProfileArgs.Append(mapType).ToArray());
                  cfg.AddProfile(profile);
              }).CreateMapper();


            return rsMapper;
        }

        //private Dictionary<(Type, Type, int), IMapper> GetAllMapperConfig()
        //{
        //    var concatRs = new Dictionary<(Type, Type, int), IMapper>()
        //               .Concat(_iMapperConfig.GetConfig<WeightNoteCreateWeightNote>())
        //               .Concat(_iMapperConfig.GetConfig<DTO_PS_WriteOff_Log>());

        //    var allMapConfigs = concatRs.ToDictionary(dic => dic.Key, dic => dic.Value);
        //    return allMapConfigs;
        //}

        public Dictionary<(Type, Type, int), IMapper> GetAllMapperConfigV2()
        {
            // 取得泛型中的類型型態
            //Dictionary<(Type, Type, int), IMapper> rsDic = new Dictionary<(Type, Type, int), IMapper>();

            //var config = new MapperConfiguration(cfg =>
            //{
            //    cfg.AddProfile(new S_WeightNote_MapProfile(_psiService));
            //}).CreateMapper();

            //var newSS = new S_WeightNote();

            //var qqt = config.Map<DTO_SalesWeightNote>(newSS);





            //var instanceTypeDicOld = GetInstanceTypeDic_PageModel()
            //                      .Concat(GetInstanceTypeDic_DTO())
            //                      .Concat(GetInstanceTypeDic_Entity())
            //                      .ToDictionary(dic => dic.Key, dic => dic.Value);
            //var instanceTypeDic = GetInstanceTypeDic_DTO()
            //                    .Concat(GetInstanceTypeDic_Entity())
            //                    .ToDictionary(dic => dic.Key, dic => dic.Value);

            var instanceTypeDic = new Dictionary<(Type, Type, int), IMapper>();


            //   var funcRs = instanceTypeDic.SelectMany(dic =>
            //{
            //       //var wowInsetance = Activator.CreateInstance(dic.Value);
            //       MethodInfo method = dic.Value.GetMethod("GetConfigDic");
            //    var funRs = method.Invoke(Activator.CreateInstance(dic.Value), null);
            //    return funRs as Dictionary<(Type, Type, int), IMapper>;
            //}).ToDictionary(dic => dic.Key, dic => dic.Value);


            return instanceTypeDic;
        }
        public Dictionary<Type, MapModel> GetAllMapperConfigV3()
        {


            return GetInstanceTypeDic_PageModel();


            //new MapperConfiguration(cfg =>
            //{
            //    var profile = (Profile)(Activator.CreateInstance(typeof(WeightNoteCreateWeightNote_MapProfile),
            //        _iSalesWeightNoteServic, 1));
            //    cfg.AddProfile(profile);
            //})



            //var funcRs = instanceTypeDic.SelectMany(dic =>
            //{

            //    var profile = (Profile)(Activator.CreateInstance(dic.Value.ProfileType,
            //      _iSalesWeightNoteServic, 1));
            //    cfg.AddProfile(profile);

            //    //var wowInsetance = Activator.CreateInstance(dic.Value);
            //    MethodInfo method = dic.Value.GetMethod(nameof(IMapperConfigAction.GetConfigDic));
            //    var funRs = method.Invoke(Activator.CreateInstance(dic.Value), null);
            //    return funRs as Dictionary<(Type, Type, int), IMapper>;
            //}).ToDictionary(dic => dic.Key, dic => dic.Value);


            //return funcRs;
        }

        private Dictionary<Type, MapModel> GetInstanceTypeDic_PageModel()
        {
            var instanceTypeDic = new Dictionary<Type, MapModel>
            {
                { typeof(WeightNoteCreateWeightNote),
                    new MapModel{ProfileType = typeof(WeightNoteCreateWeightNote_MapProfile), ProfileArgs= new object[]{ _iSalesWeightNoteServic }}
                }
            };

            //var instanceTypeDic = new Dictionary<Type, Type>
            //{
            //    { typeof(WeightNoteCreateWeightNote), typeof(WeightNoteCreateWeightNote_MapperConfig) }
            //    //,                { typeof(Sys_Show_199BOM), typeof(SysShow199BOM_MapperConfig) }
            //};

            return instanceTypeDic;
        }
        //private Dictionary<Type, Type> GetInstanceTypeDic_DTO()
        //{
        //    var instanceTypeDic = new Dictionary<Type, Type>
        //    {
        //        { typeof(DTO_PS_WriteOff_Log), typeof(DTO_PS_WreteOff_Record_MapperConfig) },
        //        { typeof(DTO_S_WeightNote_Ingredient), typeof(DTO_S_WeightNote_Ingredient_MapperConfig) },
        //        { typeof(DTO_P_Inventory), typeof(DTO_P_Inventory_MapperConfig) }

        //    };

        //    return instanceTypeDic;
        //}
        //private Dictionary<Type, Type> GetInstanceTypeDic_Entity()
        //{
        //    var instanceTypeDic = new Dictionary<Type, Type>
        //    {
        //        //{ typeof(WeightNoteCreateWeightNote), typeof(WeightNoteCreateWeightNote_MapperConfig) }
        //        //,{ typeof(D), typeof(WeightNoteCreateWeightNote_MapperConfig) }
        //        //,                { typeof(Sys_Show_199BOM), typeof(SysShow199BOM_MapperConfig) }
        //    };

        //    return instanceTypeDic;
        //}



    }
}
