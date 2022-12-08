using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.Configuration;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.AutoMapperProfiles;
using PSI.Service.IHelper;
using PSI.Service.ILogic;
using PSI.Service.IService;
using PSI.Service.Mappings;

namespace PSI.Service.Logic
{
    public class SalesWeightNoteLogic : ISalesWeightNoteLogic
    {
        //private readonly IMapper _mapper;
        //private readonly ISalesWeightNoteService _iSalesWeightNoteServic;
        //private readonly ISalesIngredientServiceNew _iSalesIngredientServiceNew;
        //private readonly ISalesWeightNoteResultPriceServiceNew _iSalesWeightNoteResultPriceServiceNew;

        private readonly IUnitOfWork _unitOfWork;

        /* Helper */
        private readonly ISalesPriceCaculateHelper _iSalesPriceCaculateHelper;

        /* Repository */
        private readonly IGenericRepository<S_WeightNote> _salesWeightNoteRepository;
        private readonly IGenericRepository<SalesIngredient> _salesIngredientRepository;
        private readonly IGenericRepository<SalesWeightNoteStepData> _salesWeightNoteResultPriceRepository;


        public SalesWeightNoteLogic(IUnitOfWork unitOfWork,
            ISalesPriceCaculateHelper iSalesPriceCaculateHelper)
        {
            //_mapper = mapper;
            _unitOfWork = unitOfWork;
            /* Helper */
            _iSalesPriceCaculateHelper = iSalesPriceCaculateHelper;

            /* Repository */
            _salesWeightNoteRepository = _unitOfWork.GetRepository<S_WeightNote>();
            _salesIngredientRepository = _unitOfWork.GetRepository<SalesIngredient>();
            _salesWeightNoteResultPriceRepository = _unitOfWork.GetRepository<SalesWeightNoteStepData>();
            //_iSalesWeightNoteServic = iSalesWeightNoteService;
            //_iSalesIngredientServiceNew = iSalesIngredientServiceNew;
            //_iSalesWeightNoteResultPriceServiceNew = iSalesWeightNoteResultPriceServiceNew;
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
                cfg.AddProfile<SalesWeightNoteLogicProfile>();
            });

            var mapper = config.CreateMapper();

            // 依據 ViewModel 的資料 建立出 <TEntity> 型別的物件
            return mapper.Map<List<TEntity>>(dtoModels);
        }

        private List<TEntity> ConvertDTOsToEntities2<DTOModel, TEntity>(List<DTOModel> dtoModels)
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
            //});

            var mapper = this.GetMapper<DTOModel, TEntity>();

            // 依據 ViewModel 的資料 建立出 <TEntity> 型別的物件
            return mapper.Map<List<TEntity>>(dtoModels);
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
                case (nameof(DTO_SalesIngredient), nameof(SalesIngredient)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<DTO_SalesIngredient, SalesIngredient>())
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

        public FunctionResult<S_WeightNote> CreateSalesWeightNote<T1, T2, T3>(T1 dtoSalesWeightNote,
            List<T2> dtoSalesIngredientList,
            T3 dtoSalesWeightNoteResultPrice,
            string docNo,
            AppUser operUserInfo)
        {
            /* 共用變數 */
            var funcRs = new FunctionResult<S_WeightNote>();
            var salseWeightNoteUNID = Guid.NewGuid();
            var createTime = DateTime.Now;
            var createEmpNo = operUserInfo.NICK_NAME;
            var updateTime = DateTime.Now;
            var updateEmpNo = operUserInfo.NICK_NAME;

            /* Get Entity */
            // 出貨磅單建立 
            var salesWeightNote = this.ConvertDTOToEntity2<T1, S_WeightNote>(dtoSalesWeightNote);
            if (salesWeightNote == null)
            {
                funcRs.ResultFailure("新增失敗，新增磅單為空值!!");
                return funcRs;
            }
            salesWeightNote.DOC_NO = docNo; // 單號
            salesWeightNote.UNID = salseWeightNoteUNID;
            salesWeightNote.CREATE_TIME = createTime;
            salesWeightNote.CREATE_EMPNO = createEmpNo;
            salesWeightNote.UPDATE_TIME = updateTime;
            salesWeightNote.UPDATE_EMPNO = updateEmpNo;
            salesWeightNote.NOTE_STATUS = (int)PSIWeightNoteEnum.SWeightNotesStatus.CreateDoc;


            // 出貨品項比例建立
            var salesIngredientList = this.ConvertDTOsToEntities<T2, SalesIngredient>(dtoSalesIngredientList);
            if (!salesIngredientList.Any())
            {
                funcRs.ResultFailure("新增失敗，出貨品項比例為空值!!");
                return funcRs;
            }

            salesIngredientList.ForEach(item =>
            {
                item.SALES_WEIGHTNOTE_UNID = salseWeightNoteUNID;
                item.CREATE_TIME = createTime;
                item.CREATE_EMPNO = createEmpNo;
                item.UPDATE_TIME = updateTime;
                item.UPDATE_EMPNO = updateEmpNo;
            });


            // 相關金額值建立建立 
            var salesWeightNoteResultPrice = this.ConvertDTOToEntity<T3, SalesWeightNoteStepData>(dtoSalesWeightNoteResultPrice);
            if (salesWeightNoteResultPrice == null)
            {
                funcRs.ResultFailure("新增失敗，相關金額為空值!!");
                return funcRs;
            }
            if (salesWeightNoteResultPrice != null)
            {
                salesWeightNoteResultPrice.DOC_NO = docNo;
                salesWeightNoteResultPrice.DOC_UNID = salseWeightNoteUNID;
                salesWeightNoteResultPrice.CREATE_TIME = createTime;
                salesWeightNoteResultPrice.CREATE_EMPNO = createEmpNo;
                salesWeightNoteResultPrice.UPDATE_TIME = updateTime;
                salesWeightNoteResultPrice.UPDATE_EMPNO = updateEmpNo;





                //var creRs = _salesWeightNoteResultPriceRepository.Create(salesWeightNoteResultPrice);
                //if (!creRs.Success)
                //{
                //    funcRs.ResultFailure(creRs.ActionMessage);
                //    return funcRs;
                //}
            }

            //var salesWeightNoteValidator = new SalesWeightNoteValidator();
            //var validRs = salesWeightNoteValidator.Validate(argSalesWeightNote,
            //    options => options.IncludeRuleSets(nameof(this.CreateWeightNote)));

            _salesWeightNoteRepository.Create(salesWeightNote);
            _salesIngredientRepository.Create(salesIngredientList);
            _salesWeightNoteResultPriceRepository.Create(salesWeightNoteResultPrice);
            var commitRs = _unitOfWork.SaveChange();

            if (!commitRs.Success)
            {
                funcRs.ResultFailure(commitRs.ErrorMessage);
                return funcRs;
            }

            funcRs.ResultSuccess("出貨磅單新增成功", salesWeightNote);
            //_iSalesWeightNoteServic.CreateEntityByDTOModelNoSave(dtoSalesWeightNote);
            //_iSalesIngredientServiceNew.CreateEntityByDTOModelNoSave(salesIngredientList);
            //_iSalesWeightNoteResultPriceServiceNew.CreateEntityByDTOModelNoSave(salesWeightNoteResultPrice);

            return funcRs;

        }


    }
}
