using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.AutoMapperProfiles;
using PSI.Service.AutoMapperProfiles.Entity;
using PSI.Service.AutoMapperProfiles.PageMoedl;
using PSI.Service.Helper.IHelper;
using PSI.Service.IService;
using PSI.Service.Logic.ILogic;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PSI.Service.Logic
{
    public class SalesWeightNoteLogic : ISalesWeightNoteLogic
    {
        private readonly ISalesWeightNoteService _iSalesWeightNoteService;
        private readonly ISalesIngredientServiceNew _iSalesIngredientServiceNew;
        private readonly IGenericService<P_Inventory> _iPInventoryService;
        private readonly IGenericService<PS_WriteOff_Log> _iPSWriteOffLogService;
        private readonly IPsiService _iPsiService;
        private readonly IUnitOfWork _unitOfWork;

        //private readonly IMapperHelper _iMapperHelper;

        //private readonly ISalesIngredientServiceNew _iSalesIngredientServiceNew;
        //private readonly ISalesWeightNoteResultPriceServiceNew _iSalesWeightNoteResultPriceServiceNew;


        /* Helper */
        private readonly IWeightCaculateHelper _iWeightCaculateHelper;




        public SalesWeightNoteLogic(IUnitOfWork unitOfWork,
            ISalesWeightNoteService iSalesWeightNoteService,
            ISalesIngredientServiceNew iSalesIngredientServiceNew,
            IPsiService iPsiService,
            IGenericService<P_Inventory> iPInventoryService,
            IGenericService<PS_WriteOff_Log> iPSWriteOffLogService,
        IWeightCaculateHelper iWeightCaculateHelper
            //,ISalesPriceCaculateHelper iSalesPriceCaculateHelper
            )
        {
            //_mapper = mapper;
            _unitOfWork = unitOfWork;
            _iSalesWeightNoteService = iSalesWeightNoteService;
            _iSalesIngredientServiceNew = iSalesIngredientServiceNew;
            _iPsiService = iPsiService;
            _iPInventoryService = iPInventoryService;
            _iPSWriteOffLogService = iPSWriteOffLogService;
            _iWeightCaculateHelper = iWeightCaculateHelper;
            /* Helper */
            //_iSalesPriceCaculateHelper = iSalesPriceCaculateHelper;
        }


        private TEntity ConvertDTOToEntity<DTOModel, TEntity>(DTOModel dtoModel)
        {
            //建立組態檔
            var cfg = new MapperConfigurationExpression();
            //可反轉
            cfg.CreateMap<DTOModel, TEntity>().ReverseMap();
            //實例 Mapper 的物件
            // Mapper.Initialize(cfg);
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<SalesWeightNoteLogicProfile>();
                //cfg.AddProfile<PageModelMappings>();
            });

            var mapper = config.CreateMapper();

            // 依據 ViewModel 的資料 建立出 <TEntity> 型別的物件
            return mapper.Map<TEntity>(dtoModel);
        }

        private TEntity ConvertDTOToEntity2<DTOModel, TEntity>(DTOModel dtoModel)
        {
            ////建立組態檔
            //var cfg = new MapperConfigurationExpression();
            ////可反轉
            //cfg.CreateMap<DTOModel, TEntity>().ReverseMap();
            ////實例 Mapper 的物件
            //// Mapper.Initialize(cfg);
            //var config = new MapperConfiguration(cfg =>
            //{
            //    cfg.AddProfile<SalesWeightNoteLogicProfile>();
            //    //cfg.AddProfile<PageModelMappings>();
            //});

            var mapper = this.GetMapper<DTOModel, TEntity>();

            // 依據 ViewModel 的資料 建立出 <TEntity> 型別的物件
            return mapper.Map<TEntity>(dtoModel);
        }

        private List<TEntity> ConvertDTOsToEntities<DTOModel, TEntity>(List<DTOModel> dtoModels)
        {
            //建立組態檔
            var cfg = new MapperConfigurationExpression();
            //可反轉
            cfg.CreateMap<DTOModel, TEntity>().ReverseMap();
            //實例 Mapper 的物件
            // Mapper.Initialize(cfg);
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<S_WeightNote_MapProfile>();
            });

            var mapper = config.CreateMapper();

            // 依據 ViewModel 的資料 建立出 <TEntity> 型別的物件
            return mapper.Map<List<TEntity>>(dtoModels);
        }

        private Dictionary<Type, IMapper> GetInstanceTypeDic_PageModel()
        {
            var instanceTypeDic = new Dictionary<Type, IMapper>();
            //{
            //    { typeof(WeightNoteCreateWeightNote), new MapperConfiguration(
            //        cfg => { cfg.AddProfile(new WeightNoteCreateWeightNote_MapProfile(_iSalesWeightNoteServic));}).CreateMapper()
            //    //cfg.AddProfile<S_WeightNote_MapProfile>();
            //    },
            //    { typeof(S_WeightNote), new MapperConfiguration(
            //        cfg => { cfg.AddProfile(new S_WeightNote_MapProfile());}).CreateMapper()
            //    //cfg.AddProfile<S_WeightNote_MapProfile>();
            //    },
            //};
            return instanceTypeDic;
        }

        private IMapper GetMapper<DTOModel, TEntity>()
        {
            switch (typeof(TEntity).Name, typeof(DTOModel).Name)
            {
                case (nameof(WeightNoteCreateWeightNote), nameof(DTO_SalesWeightNote)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<WeightNoteCreateWeightNote, S_WeightNote>()
                       .ForMember(tar => tar.CUSTOMER_UNID, ss => ss.MapFrom(src => src.CustomerUNID))
                       .ForMember(tar => tar.CARNO_UNID, ss => ss.MapFrom(src => src.CarNoUNID))
                       .ForMember(tar => tar.EXCAVATOR_OPERATOR_UNID, ss => ss.MapFrom(src => src.ExcavatorOperUNID))
                       .ForMember(tar => tar.SALES_TIME, ss => ss.MapFrom(src => src.SalesTime))
                       .ForMember(tar => tar.CONTRACT_UNID, ss => ss.MapFrom(src => src.ContractUNID))
                       //.ForMember(tar => tar.PRODUCT_ITEM_UNID, ss => ss.MapFrom(src => src.ProductItemUNID))
                       //.ForMember(tar => tar.ESTIMATE_SALES_WEIGHT, ss => ss.MapFrom(src => src.LeaveWeight))
                       //.ForMember(tar => tar.ESTIMATE_DEFECTIVE_WEIGHT, ss => ss.MapFrom(src => src.DefectiveWeight))
                       //.ForMember(tar => tar.ESTIMATE_UNIT_PRICE, ss => ss.MapFrom(src => src.UnitPrice))
                       //.ForMember(tar => tar.TRAFIC_UNIT_PRICE, ss => ss.MapFrom(src => src.TraficUnitPrice))
                       .ForMember(tar => tar.SCALE_NO, ss => ss.MapFrom(src => src.ScaleNo))
                       //.ForMember(tar => tar.ESTIMATE_RECEIVED_TYPE, ss => ss.MapFrom(src => src.ReceivedType))
                       //.ForMember(tar => tar.ESTIMATE_RECEIVED_TIME, ss => ss.MapFrom(src => src.ReceivedTime))
                       .ForMember(tar => tar.REMARK, ss => ss.MapFrom(src => src.Remark)))
                       .CreateMapper();
                case (nameof(DTO_S_WeightNote_Ingredient), nameof(S_WeightNote_Ingredient)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<DTO_S_WeightNote_Ingredient, S_WeightNote_Ingredient>())
                       .CreateMapper();
                case (nameof(WeightNoteCreateWeightNote), nameof(SalesWeightNoteStepData)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<WeightNoteCreateWeightNote, SalesWeightNoteStepData>()
                       .ForMember(tar => tar.DATA_STEP, ss => ss.MapFrom(src => (int)PSIWeightNoteEnum.SWeightNotesStatus.CreateDoc))
                       .ForMember(tar => tar.INVOICEPRICE_HASTAX, ss => ss.MapFrom(src => src.InvoicePriceHasTax))
                       .ForMember(tar => tar.TRAFICFEE_HASTAX, ss => ss.MapFrom(src => src.TraficFeeHasTax)))
                       .CreateMapper();
                default:
                    return null;
            }
        }



        public FunctionResult<S_WeightNote> CreateSalesWeightNote<T1, T2>(T1 tSalesWeightNote, List<T2> tWeightNoteIngredient, AppUser operUserInfo)
                 where T1 : class
                 where T2 : class
        {
            var funcRs = new FunctionResult<S_WeightNote>();
            //var rsSalesWeightNote = _iMapperHelper.MapTo<T1, S_WeightNote>(salesWeightNote);

            // Create db Entity Obj
            var cSWeightNote = _iSalesWeightNoteService.CreateEntityByDTOModelNoSave(tSalesWeightNote).ResultValue;
            var cSWeightNoteIngredients = _iSalesIngredientServiceNew.CreateEntityByDTOModelNoSave(tWeightNoteIngredient).ResultValue;
            var cPsWriteOffLogs = new List<PS_WriteOff_Log>();
            var uPInventories = new List<P_Inventory>();

            // Get values
            var saleWeightNoteDocNo = _iPsiService.GetWeightNoteDocNo(operUserInfo.FAC_SITE, PSIEnum.PSIType.Sale);
            var sellOutWeightNoteDic = cSWeightNoteIngredients.ToDictionary(x => x.PRODUCT_UNID, x => _iWeightCaculateHelper.GetProportionWeight(x.ITEM_PERCENT, cSWeightNote.INSIDE_SALES_WEIGHT));

            var userDerItemUNIDs = cSWeightNoteIngredients.Select(aa => aa.PRODUCT_UNID).ToList();
            var dtoPInventories = _iPInventoryService.GetDTOModels<DTO_P_Inventory>(aa => userDerItemUNIDs.Contains(aa.PRODUCT_UNID) &&
               aa.STATUS == (int)PSIWeightNoteEnum.P_InventoryStatus.HasInventory &&
               aa.REMAINING_WEIGHT > 0).ToList();
            var psWreteOffLogs = dtoPInventories.GroupBy(aa => aa.PRODUCT_UNID).SelectMany(inventoryGroup =>
            {
                var partSellWeight = sellOutWeightNoteDic[inventoryGroup.Key];
                var dtoPSWreiteOffRecordCols = inventoryGroup.OrderBy(bb => bb.PURCHASE_DOC_NO).Select
                (inventory =>
                {
                    if (partSellWeight <= 0)
                        return null;

                    var caculateRs = partSellWeight - inventory.REMAINING_WEIGHT;
                    var dtoPSWreiteOffRecord = new PS_WriteOff_Log
                    {
                        WRITEOFF_WEIGHT = caculateRs > 0 ? inventory.REMAINING_WEIGHT : partSellWeight,
                        PURCHASE_WEIGHTNOTE_UNID = inventory.PURCHASE_WEIGHTNOTE_UNID,
                        PURCHASE_DOC_NO = inventory.PURCHASE_DOC_NO,
                        SALES_WEIGHTNOTE_UNID = cSWeightNote.UNID,
                        SALES_DOC_NO = saleWeightNoteDocNo,
                        PRODUCT_UNID = inventory.PRODUCT_UNID,
                        PRODUCT_NAME = inventory.PRODUCT_ITEM_NAME,
                        WRITEOFF_STATUS = (int)PSIWeightNoteEnum.S_WriteOffLogStatus.Available
                    };
                    partSellWeight = caculateRs;

                    return dtoPSWreiteOffRecord;
                });
                return dtoPSWreiteOffRecordCols;
            }).Where(aa => aa != null).ToList();

            var saleUnitPrice = psWreteOffLogs.Sum(aa => aa.WRITEOFF_WEIGHT * dtoPInventories.FirstOrDefault(bb => bb.PURCHASE_WEIGHTNOTE_UNID == aa.PURCHASE_WEIGHTNOTE_UNID).UNIT_PRICE) / cSWeightNote.INSIDE_SALES_WEIGHT;
            var updatePInventories = psWreteOffLogs.Select(aa =>
            {
                var updateInventory = dtoPInventories.FirstOrDefault(bb => bb.PURCHASE_WEIGHTNOTE_UNID == aa.PURCHASE_WEIGHTNOTE_UNID &&
                                                 bb.PRODUCT_UNID == aa.PRODUCT_UNID);
                updateInventory.REMAINING_WEIGHT = updateInventory.REMAINING_WEIGHT - aa.WRITEOFF_WEIGHT;
                updateInventory.UPDATE_EMPNO = operUserInfo.EMPLOYEE_NO;
                updateInventory.UPDATE_TIME = DateTime.Now;
                return updateInventory;
            }).ToList();


            // Assign to Entity
            cSWeightNote.DOC_NO = saleWeightNoteDocNo;
            cSWeightNote.CREATE_EMPNO = operUserInfo.EMPLOYEE_NO;
            cSWeightNote.UPDATE_EMPNO = operUserInfo.EMPLOYEE_NO;
            cSWeightNote.PRODUCT_ITEM_UNID = cSWeightNoteIngredients.OrderByDescending(aa => aa.ITEM_PERCENT)
                                                                             .FirstOrDefault().PRODUCT_UNID;
            cSWeightNote.SALES_UNIT_PRICE = Math.Round(saleUnitPrice, 2);
            cSWeightNoteIngredients.ForEach(item =>
            {
                item.SALES_WEIGHTNOTE_UNID = cSWeightNote.UNID;
                item.CREATE_EMPNO = operUserInfo.EMPLOYEE_NO;
                item.UPDATE_EMPNO = operUserInfo.EMPLOYEE_NO;
            });


            // Commit DB
            _iSalesWeightNoteService.CreateEntityByDTOModelNoSave(cSWeightNote);
            _iPSWriteOffLogService.CreateEntityByDTOModelNoSave(psWreteOffLogs);
            _iSalesIngredientServiceNew.CreateEntityByDTOModelNoSave(cSWeightNoteIngredients);
            _iPInventoryService.UpdateViewModelToDatabasesNoSave(updatePInventories);

            var commitRs = _unitOfWork.SaveChange();  // 都沒有問題在建立




            //_unitOfWork.SaveChange();
            //var iMaper = GetInstanceTypeDic_PageModel()[typeof(T1)];

            //var lala = iMaper.Map<S_WeightNote>(salesWeightNote);
            funcRs.ResultSuccess("Successed", cSWeightNote);
            return funcRs;
        }
    }
}
