using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.Purchase.WebAPIs;
using PSI.Areas.Sales.Models.PageModels;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Extensions;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.EntityValidators;
using PSI.Infrastructure.Extensions;
using PSI.Mappgins.Interface;
using PSI.Models.PEModels;
using PSI.Service.Helper.IHelper;
using PSI.Service.IMapperProfile;
using PSI.Service.IService;
using PSI.Service.Logic;
using PSI.Service.Logic.ILogic;
using PSI.Service.Service;
using WeightNoteControllerMapper = PSI.Areas.Sales.Mappers.WeightNoteControllerMapper;
using WeightNoteCreateWeightNote = PSI.Core.Models.PageModels.Areas.Sales.WeightNoteCreateWeightNote;

namespace PSI.Areas.Sales.Controllers
{
    [Area("Sales")]
    public class WeightNoteController : Controller
    {
        // Other
        //private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;

        // Service
        // private readonly ISalesWeightNoteService _iSalesWeightNoteService;
        private readonly ISalesWeightNoteService _iSalesWeightNoteService;
        private readonly ICodeTableService _codeTableService;
        private readonly ICodeTableServiceNew _codeTableServiceNew;
        private readonly ICustomerService _customerService;
        private readonly IPsiService _psiService;
        private readonly ICustomerInfoService _customerInfoService;
        private readonly ICustomerInfoServiceNew _iCustomerInfoServiceNew;
        private readonly ICustomerContractService _customerContractService;
        private readonly ICustomerContractServiceNew _iCustomerContractServiceNew;
        private readonly IProductItemService _productItemService;
        private readonly IProductItemServiceNew _iProductItemServiceNew;
        private readonly ICarNoService _iCarNoService;
        private readonly ICarNoServiceNew _iCarNoServiceNew;
        private readonly ISalesIngredientService _iSalesIngredientService;
        private readonly ISalesIngredientServiceNew _iSalesIngredientServiceNew;
        private readonly IGenericService<P_Inventory> _pInventoryService;
        private readonly IGenericService<PS_WriteOff_Log> _psWriteOffLogService;
        // Mapper
        private readonly IMapperOfSalesWeightNote _iMapperOfSalesWeightNote;
        private readonly IMapperOfSalesIngredient _iMapperOfSalesIngredient;
        private readonly IMapperOfSalesWeightNoteResultPrice _iMapperOfSalesWeightNoteResultPrice;
        private readonly IPESalesWeightNoteMapper _iPESalesWeightNoteMapper;
        private readonly IMapperOfPE_SalesIngredient _iMapperOfPE_SalesIngredient;
        private readonly IPageModelMapper _iPageModelMapper;

        // Logic
        private readonly ISalesWeightNoteLogic _iSalesWeightNoteLogic;
        //private readonly IEntityMapperProfile _iEntityMapperProfile;

        // Helper
        private readonly ISalesPriceCaculateHelper _iSalesPriceCaculateHelper;
        private readonly IMapperHelper _iMapperHelper;
        private readonly IWeightCaculateHelper _iWeightCaculateHelper;

        // 準備移除
        private readonly IPSIEnumService _pSIEnumService;
        private readonly ICustomerContractEnumService _iCustomerContractEnumService;
        private readonly WeightNoteControllerMapper _mapperHelper;


        public WeightNoteController(IPsiService psiService,
                                    ICodeTableService codeTableService,
                                    ICodeTableServiceNew codeTableServiceNew,
                                    ISalesWeightNoteService iSalesWeightNoteService,
                                    ICustomerService customerService,
                                    ICustomerContractService customerContractService,
                                    ICustomerContractServiceNew iCustomerContractServiceNew,
                                    IProductItemService productItemService,
                                    IProductItemServiceNew iProductItemServiceNew,
                                    ICustomerInfoService customerInfoService,
                                    ICustomerInfoServiceNew iCustomerInfoServiceNew,
                                    ICustomerContractEnumService iCustomerContractEnumService,
                                    IPSIEnumService pSIEnumService,
                                    IMapperOfSalesIngredient iMapperOfSalesIngredient,
                                    ICarNoService iCarNoService,
                                    ICarNoServiceNew iCarNoServiceNew,
                                    ISalesPriceCaculateHelper iSalesPriceCaculateHelper,
                                    IMapperOfSalesWeightNote iMapperOfSalesWeightNote,
                                    IMapperOfSalesWeightNoteResultPrice iMapperOfSalesWeightNoteResultPrice,
                                    IHttpContextAccessor httpContextAccessor,
                                    ISalesIngredientService iSalesIngredientService,
                                    ISalesIngredientServiceNew iSalesIngredientServiceNew,
                                    IPESalesWeightNoteMapper iPESalesWeightNoteMapper,
                                    IMapperOfPE_SalesIngredient iMapperOfPE_SalesIngredient,
                                    IPageModelMapper iPageModelMapper,
                                    ISalesWeightNoteLogic iSalesWeightNoteLogic,
                                    //IEntityMapperProfile iEntityMapperProfile,
                                    UserManager<AppUser> userManager,
                                   IMapperHelper iMapperHelper,
                                    IUnitOfWork unitOfWork,
                                    IGenericService<P_Inventory> pInventoryService,
                                     IGenericService<PS_WriteOff_Log> psWriteOffLogService,
                                    IWeightCaculateHelper iWeightCaculateHelper)
        {
            // Other
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            // Service
            _iSalesWeightNoteService = iSalesWeightNoteService;
            _iSalesIngredientService = iSalesIngredientService;
            _iSalesIngredientServiceNew = iSalesIngredientServiceNew;
            _psiService = psiService;
            _codeTableService = codeTableService;
            _codeTableServiceNew = codeTableServiceNew;
            _customerService = customerService;
            _customerContractService = customerContractService;
            _iCustomerContractServiceNew = iCustomerContractServiceNew;
            _productItemService = productItemService;
            _iProductItemServiceNew = iProductItemServiceNew;
            _customerInfoService = customerInfoService;
            _iCustomerInfoServiceNew = iCustomerInfoServiceNew;
            _iCarNoService = iCarNoService;
            _iCarNoServiceNew = iCarNoServiceNew;
            _iPESalesWeightNoteMapper = iPESalesWeightNoteMapper;
            _pInventoryService = pInventoryService;
            _psWriteOffLogService = psWriteOffLogService;

            // Mapper
            _iMapperOfSalesWeightNoteResultPrice = iMapperOfSalesWeightNoteResultPrice;
            _iMapperOfSalesIngredient = iMapperOfSalesIngredient;
            _iMapperOfSalesWeightNote = iMapperOfSalesWeightNote;
            _iMapperOfPE_SalesIngredient = iMapperOfPE_SalesIngredient;
            _iPageModelMapper = iPageModelMapper;

            // Helper
            _iSalesPriceCaculateHelper = iSalesPriceCaculateHelper;
            _iMapperHelper = iMapperHelper;
            _iWeightCaculateHelper = iWeightCaculateHelper;

            // Logic
            _iSalesWeightNoteLogic = iSalesWeightNoteLogic;
            //_iEntityMapperProfile = iEntityMapperProfile;

            // 代移除
            _pSIEnumService = pSIEnumService;
            _iCustomerContractEnumService = iCustomerContractEnumService;
            _mapperHelper = new WeightNoteControllerMapper();


            //_httpContextAccessor = httpContextAccessor;            
        }


        //[HttpGet]
        //public IActionResult Create()
        //{
        //    return PartialView("_CreatePurchaseDocPartial");
        //}


        [HttpGet]
        [Authorize()]
        // [RuleSetForClientSideMessages("Skip")]
        public IActionResult CreateWeightNote()
        {
            ViewData["Title"] = "出貨磅單建立";

            // string host = _httpContextAccessor.HttpContext.Request.Host.Value;  //能夠取得Host Domain Name
            //var haha = _psiService.GetPurchaseWeightNotesStatus()
            //    .ToDictionary(aa => aa.Key, aa => aa.Value.GetDescription()).ToPageSelectList("Value", "Key");



            //_iSalesWeightNoteService.CreateEntityByDTOModelNoSave(abcd.ResultValue);

            return View(PageModelOfCreateWeightNote());
        }

        [HttpGet]
        [Authorize()]
        // [RuleSetForClientSideMessages("Skip")]
        public IActionResult EditWeightNote(string unid)
        {
            // 或許編輯頁面和回血頁面的顯示方式應該要不同
            return RedirectToAction(nameof(WeightNoteController.QueryList));
        }

        [HttpGet]
        [Authorize()]
        // [RuleSetForClientSideMessages("Skip")]
        public IActionResult UpdateActualData(string unid)
        {


            // var dtoCustomerInfo=DTO_CustomerInfo
            // var abc2 = _iSalesWeightNoteService2.GetDTOModels<PE_SalesWeightNote>(aa => aa.UNID == dtoSalesWeightNote.Unid);

            // ori logic start

            //// 用Unid去查出該筆的SalesWeightNote
            //var salesWeightNote = _iSalesWeightNoteService.GetSalesWeightNote(new Guid(unid));
            //// Mapper成關聯 peModel
            //var peSalesWeightNote = _iPESalesWeightNoteMapper.GetUpdateActualDataMapper<SalesWeightNote>()
            //    .Map<PE_SalesWeightNote>(salesWeightNote);

            //var pageModel = _iPageModelMapper.GetModel<WeightNoteUpdateActualData>(salesWeightNote);


            // ori logic end


            //var pModel = _iPageModelMapper.MapTo<SalesWeightNote, WeightNoteUpdateActualData>(salesWeightNote);
            //var pModel1 = _iPageModelMapper.MapTo<WeightNoteUpdateActualData>(salesWeightNote);
            //var pModel2 = _iPageModelMapper.GetMapper<SalesWeightNote, WeightNoteUpdateActualData>()
            //    .Map<WeightNoteUpdateActualData>(salesWeightNote);
            //var pModel3 = _iPageModelMapper.GetMapper<SalesWeightNote>().Map<WeightNoteUpdateActualData>(salesWeightNote);
            //var abc2 = _iPESalesWeightNoteMapper.MapTo(abc);
            //var abc3 = _iPESalesWeightNoteMapper.GetMapper<SalesWeightNote, WeightNoteUpdateActualData>()
            //            .Map<WeightNoteUpdateActualData>(salesWeightNote);
            //var abc4 = _iPESalesWeightNoteMapper.MapTo<SalesWeightNote, WeightNoteUpdateActualData>(salesWeightNote);



            // Set to pageModel
            //var pageModel = new WeightNoteUpdateActualData
            //{
            //    PESalesWeightNote = peSalesWeightNote
            //};




            // 或許編輯頁面和回寫頁面的顯示方式應該要不同
            return View(PageModelOfUpdateActualData(null, unid));
            //return View(pageModel2);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult CreateWeightNote(WeightNoteCreateWeightNote pageModel)
        {
            // 之後要做後端檢核 在這邊

            var operUser = _userManager.GetUserAsync(User).Result;
            // DB邏輯 ---------------- new (感覺最後要弄成Logic)

            var createRs = _iSalesWeightNoteLogic.CreateSalesWeightNote(pageModel,
                pageModel.DTOSWeightNoteIngredients,
                operUser); ;


            var dddde = createRs.Success;

            // 建立出貨組成表(含比例)(出貨重量 optional)(根據沖銷結果的品項平均成本單價)(客戶回填單價)
            var sWeightNoteIngredients = _iMapperHelper.MapTo<DTO_S_WeightNote_Ingredient, S_WeightNote_Ingredient>(pageModel.DTOSWeightNoteIngredients).Where(aa => aa.ITEM_PERCENT != 0m).ToList();


            // 建立出貨單
            var saleWeightNote = _iMapperHelper.MapTo<WeightNoteCreateWeightNote, S_WeightNote>(pageModel);
            saleWeightNote.DOC_NO = _psiService.GetWeightNoteDocNo(operUser.FAC_SITE, PSIEnum.PSIType.Sale);
            saleWeightNote.CREATE_EMPNO = operUser.EMPLOYEE_NO;
            saleWeightNote.UPDATE_EMPNO = operUser.EMPLOYEE_NO;
            saleWeightNote.PRODUCT_ITEM_UNID = sWeightNoteIngredients.OrderByDescending(aa => aa.ITEM_PERCENT)
                                                                             .FirstOrDefault().PRODUCT_UNID;

            // 建立沖銷紀錄表
            var sellOutWeightNoteDic = sWeightNoteIngredients.ToDictionary(x => x.PRODUCT_UNID, x => _iWeightCaculateHelper.GetProportionWeight(x.ITEM_PERCENT, saleWeightNote.INSIDE_SALES_WEIGHT));

            var userDerItemUNIDs = sWeightNoteIngredients.Select(aa => aa.PRODUCT_UNID).ToList();
            var dtoPInventories = _pInventoryService.GetDTOModels<DTO_P_Inventory>(aa => userDerItemUNIDs.Contains(aa.PRODUCT_UNID) &&
               aa.STATUS == (int)PSIWeightNoteEnum.P_InventoryStatus.HasInventory &&
               aa.REMAINING_WEIGHT > 0).ToList();
            var dtoPSWreteOffRecordRs = dtoPInventories.GroupBy(aa => aa.PRODUCT_UNID).SelectMany(inventoryGroup =>
            {
                var partSellWeight = sellOutWeightNoteDic[inventoryGroup.Key];
                var dtoPSWreiteOffRecordCols = inventoryGroup.OrderBy(bb => bb.PURCHASE_DOC_NO).Select
                (inventory =>
                {
                    if (partSellWeight <= 0)
                        return null;

                    var caculateRs = partSellWeight - inventory.REMAINING_WEIGHT;
                    var dtoPSWreiteOffRecord = new DTO_PS_WriteOff_Log
                    {
                        WRITEOFF_WEIGHT = caculateRs > 0 ? inventory.REMAINING_WEIGHT : partSellWeight,
                        PURCHASE_WEIGHTNOTE_UNID = inventory.PURCHASE_WEIGHTNOTE_UNID,
                        PURCHASE_DOC_NO = inventory.PURCHASE_DOC_NO,
                        SALES_WEIGHTNOTE_UNID = saleWeightNote.UNID,
                        SALES_DOC_NO = saleWeightNote.DOC_NO,
                        PRODUCT_UNID = inventory.PRODUCT_UNID,
                        PRODUCT_NAME = inventory.PRODUCT_ITEM_NAME,
                        WRITEOFF_STATUS = (int)PSIWeightNoteEnum.S_WriteOffLogStatus.Available
                    };
                    partSellWeight = caculateRs;

                    return dtoPSWreiteOffRecord;
                });
                return dtoPSWreiteOffRecordCols;
            }).Where(aa => aa != null).ToList();


            // 相關金額計算 & 相依資料處裡
            var saleUnitPrice = dtoPSWreteOffRecordRs.Sum(aa => aa.WRITEOFF_WEIGHT * dtoPInventories.FirstOrDefault(bb => bb.PURCHASE_WEIGHTNOTE_UNID == aa.PURCHASE_WEIGHTNOTE_UNID).UNIT_PRICE) / saleWeightNote.INSIDE_SALES_WEIGHT;
            saleWeightNote.SALES_UNIT_PRICE = Math.Round(saleUnitPrice, 2);

            sWeightNoteIngredients.ForEach(item =>
            {
                item.SALES_WEIGHTNOTE_UNID = saleWeightNote.UNID;
                item.CREATE_EMPNO = operUser.NICK_NAME;
                item.UPDATE_EMPNO = operUser.NICK_NAME;
            });


            // 更新庫存
            var updateInventories2 = dtoPSWreteOffRecordRs.Select(aa =>
            {
                var updateInventory = dtoPInventories.FirstOrDefault(bb => bb.PURCHASE_WEIGHTNOTE_UNID == aa.PURCHASE_WEIGHTNOTE_UNID &&
                                                 bb.PRODUCT_UNID == aa.PRODUCT_UNID);
                updateInventory.REMAINING_WEIGHT = updateInventory.REMAINING_WEIGHT - aa.WRITEOFF_WEIGHT;
                return updateInventory;
            }).ToList();

            var psWriteOffLogs = _iMapperHelper.MapTo<DTO_PS_WriteOff_Log, PS_WriteOff_Log>(dtoPSWreteOffRecordRs);
            var updatePInventories = _iMapperHelper.MapTo<DTO_P_Inventory, P_Inventory>(updateInventories2);


            _pInventoryService.UpdateViewModelToDatabasesNoSave(updatePInventories);
            _iSalesWeightNoteService.CreateEntityByDTOModelNoSave(saleWeightNote);
            _psWriteOffLogService.CreateEntityByDTOModelNoSave(dtoPSWreteOffRecordRs);
            _iSalesIngredientServiceNew.CreateEntityByDTOModelNoSave(pageModel.DTOSWeightNoteIngredients);

            var commitRs = _unitOfWork.SaveChange();  // 都沒有問題在建立

            //var costAPICtrl = new CostController();
            //var inventoryAPCtrl = new InventoryController(_pInventoryService);
            //var salesUnitPrice = sWeightNoteIngredients.Sum(aa =>
            //{
            //    var avgUnitPrice = inventoryAPCtrl.GetInventoryAvgUnitPrice(aa.PRODUCT_UNID);
            //    return costAPICtrl.GetCostUnitPrce(aa.ITEM_PERCENT, avgUnitPrice);
            //});










            // 建立沖銷紀錄表 (主要包含 對應的庫存單號 還有沖銷的重量)(不用比例)
            // 先產生沖銷表 就可以知道那些庫存表要更新    









            // 更新庫存表






            // 認列策略 需要討論  要先進先出 還是先把便宜的出掉還是貴的出掉 (會影響平均成本計算)
            // 更新庫存 

            //var dtoPInventories = _pInventoryService.GetDTOModels<DTO_P_Inventory>(aa => userDerItemUNIDs.Contains(aa.PRODUCT_UNID) &&
            //aa.STATUS == (int)PSIWeightNoteEnum.P_InventoryStatus.HasInventory &&
            //aa.REMAINING_WEIGHT > 0).GroupBy(aa => aa.PRODUCT_UNID);




            //var lalau = dtoPInventories.Select(group =>
            //  {
            //      var nominator = psWreteOffRecord.FirstOrDefault(bb => bb.PRODUCT_UNID == group.Key).PERCENT;
            //      var writeOffWeight = _iWeightCaculateHelper.GetProportionWeight(nominator, saleWeightNote.INSIDE_SALES_WEIGHT);


            //      var abc = aa.OrderBy(bb => bb.PURCHASE_DOC_NO).Select(bb =>
            //      {
            //          var writeOffRs = writeOffWeight - bb.REMAINING_WEIGHT;
            //          if (writeOffRs > 0)  // 預計出貨本張庫存沖不完
            //          {
            //              bb.REMAINING_WEIGHT = 0m;
            //              writeOffWeight = writeOffRs;
            //          }
            //          else // 預計出貨於本張庫存沖完
            //          {
            //              bb.REMAINING_WEIGHT = bb.REMAINING_WEIGHT - writeOffWeight;
            //              writeOffWeight = 0;
            //          }



            //          return bb;
            //      });
            //      return aa;
            //  });


            // 建立沖銷表


            //vdd.ToList().ForEach

            //var sum199BOMRs = data199Boms.Where(aa => aa.PROCESS_ID == userSelectTerminal)
            //                            .GroupBy(aa => new { aa.LOT_NO, aa.PART_NO })
            //                            .Select(bb => new Sys_Show_199BOM
            //                            {
            //                                LOT_NO = bb.Key.LOT_NO,
            //                                PART_NO = bb.Key.PART_NO,
            //                                SPEC1 = bb.FirstOrDefault().SPEC1,
            //                                QTY_NORMAL = bb.Sum(aa => aa.QTY_NORMAL),
            //                                UOM = bb.FirstOrDefault().UOM,
            //                                SUB_SPEC1 = bb.FirstOrDefault().SUB_SPEC1
            //                            }).ToList();






            // ----------------old


            //var createRs = _iSalesWeightNoteLogic.CreateSalesWeightNote(pageModel,
            //    pageModel.DTOSalesIngredients,
            //    pageModel,
            //    _psiService.GetWeightNoteDocNo(operUser.FAC_SITE, PSIEnum.PSIType.Sale), // 單號 (驗證完後再給)
            //    operUser);

            if (!commitRs.Success)
            {
                TempData["pageMsg"] = commitRs.ErrorMessage;
                return View(PageModelOfCreateWeightNote(pageModel));
            }

            // Successed
            TempData["pageMsg"] = $@"磅單:{ saleWeightNote.DOC_NO } 建立成功!!";
            return RedirectToAction(nameof(WeightNoteController.QueryList));
        }


        [HttpPost]
        [Authorize()]
        public IActionResult CreateWeightNoteOld(WeightNoteCreateWeightNote pageModel)
        {
            /* Action variables */
            var stepErrMsg = "";
            var operUser = _userManager.GetUserAsync(User).Result;


            //var add = new DTO_SalesWeightNote
            //{
            //    CustomerUNID = Guid.NewGuid(),
            //    Unid = Guid.NewGuid()
            //};

            //var gogo = _iSalesWeightNoteLogic2.CreateSalesWeightNote(add,
            //    pageModel.PESalesIngredientList,
            //    pageModel,
            //    _psiService.GetWeightNoteDocNo(operUser.FAC_SITE, PSIEnum.PSIType.Sale),
            //                   _userManager.GetUserAsync(User).Result);




            // ValidEntities
            // Insert Table

            /* Step Functions */
            bool TurnToEntities(out S_WeightNote salesWeightNote,
                out List<S_WeightNote_Ingredient> salesIngredients,
                out SalesWeightNoteStepData salesWeightNoteResultPrice,
                out string errMsg)
            {
                salesWeightNote = _iMapperOfSalesWeightNote.SalesWeightNoteCreate<WeightNoteCreateWeightNote>()
                                      .Map<S_WeightNote>(pageModel);
                salesIngredients = _iMapperOfSalesIngredient.SalesWeightNoteCreate<PE_SalesIngredient>()
                                   .Map<List<S_WeightNote_Ingredient>>(pageModel.DTOSWeightNoteIngredients);
                salesWeightNoteResultPrice = _iMapperOfSalesWeightNoteResultPrice.SalesWeightNoteCreate<WeightNoteCreateWeightNote>()
                                             .Map<SalesWeightNoteStepData>(pageModel);

                var ddd = _iMapperOfSalesIngredient.SalesWeightNoteCreate<PE_SalesIngredient>()
                                   .Map<List<S_WeightNote_Ingredient>>(pageModel.DTOSWeightNoteIngredients);

                errMsg = "";
                return true;
            }
            bool ValidEntities(in S_WeightNote argSalesWeightNote,
                in List<S_WeightNote_Ingredient> argSalesIngredientList,
                in SalesWeightNoteStepData argSalesWeightNoteResultPrice,
                out string errMsg)
            {

                // ar validRs = validator.Validate(pageModel);
                var salesWeightNoteValidator = new SalesWeightNoteValidator();
                var validRs = salesWeightNoteValidator.Validate(argSalesWeightNote,
                    options => options.IncludeRuleSets(nameof(this.CreateWeightNote)));

                if (!validRs.IsValid)
                {
                    errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs.Errors)}";
                    return false;
                }

                var salesIngredientValidator = new SalesIngredientValidator();
                foreach (var item in argSalesIngredientList)
                {
                    var validRs2 = salesIngredientValidator.Validate(item,
                       options => options.IncludeRuleSets(nameof(this.CreateWeightNote)));
                    if (!validRs2.IsValid)
                    {
                        errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs2.Errors)}";
                        return false;
                    }
                }


                var salesWeightNoteResultPriceValidator = new SalesWeightNoteResultPriceValidator();
                var validRs3 = salesWeightNoteResultPriceValidator.Validate(argSalesWeightNoteResultPrice,
                   options => options.IncludeRuleSets(nameof(this.CreateWeightNote)));
                if (!validRs3.IsValid)
                {
                    errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs3.Errors)}";
                    return false;
                }


                errMsg = "";
                return true;     // Return Result
            }

            #region -- InsertToDB --
            bool InsertToDB(in S_WeightNote argSalesWeightNote,
                in List<S_WeightNote_Ingredient> argSalesIngredientList,
                in SalesWeightNoteStepData argSalesWeightNoteResultPrice,
                out S_WeightNote rsSalesWeightNote,
                out string errMsg)
            {




                // Create 進貨磅單  Logic
                var oldSaleWeightNoteService = new SalesWeightNoteServiceOld();
                var funcRs = oldSaleWeightNoteService.CreateSalesWeightNote(argSalesWeightNote,
                              argSalesIngredientList,
                              argSalesWeightNoteResultPrice,
                              _psiService.GetWeightNoteDocNo(operUser.FAC_SITE, PSIEnum.PSIType.Sale), // 單號 (驗證完後再給)
                               _userManager.GetUserAsync(User).Result);
                if (!funcRs.Success)
                    errMsg = funcRs.ErrorMessage;


                rsSalesWeightNote = funcRs.ResultValue;
                errMsg = "";
                return true;     // Return Result
            }
            #endregion


            // Step Result
            if (!TurnToEntities(out var dataSalesWeightNote, out var dataIngredientList, out var dataWeightNoteResultPrice,
                out stepErrMsg) ||
                !ValidEntities(dataSalesWeightNote, dataIngredientList, dataWeightNoteResultPrice, out stepErrMsg) ||
                !InsertToDB(dataSalesWeightNote, dataIngredientList, dataWeightNoteResultPrice, out var rsSalesWeightNote, out stepErrMsg))
            {
                TempData["pageMsg"] = stepErrMsg;
                return View(PageModelOfCreateWeightNote(pageModel));
            }


            // Successed
            TempData["pageMsg"] = $@"磅單:{rsSalesWeightNote.DOC_NO} 建立成功!!";
            return RedirectToAction(nameof(WeightNoteController.QueryList));

        }

        [HttpGet]
        [Authorize()]
        public IActionResult QueryListOld(string sTime = null, string eTime = null, string facSite = null)
        {
            if (!DateTime.TryParse(sTime, out var pStatTime) ||
                !DateTime.TryParse(eTime, out var pETime))
            {
                pStatTime = DateTime.Now.AddDays(1 - DateTime.Now.Day);
                pETime = pStatTime.AddMonths(1);
            }

            var curUser = _userManager.GetUserAsync(User).Result;

            /* 這段感覺可以優化 改成相依Helper之類 */
            var dtoOngoSalesWeightDocs = _iSalesWeightNoteService.GetDTOOngoSalesWeightDocs();
            //var curMonthWeightNotes = new List<SalesWeightNote>().AsQueryable();


            if (curUser.AUTHORITY_LEVEL % 10 > 0 &&
                !string.IsNullOrEmpty(facSite) &&
                facSite != "all")
                dtoOngoSalesWeightDocs = dtoOngoSalesWeightDocs.Where(aa => aa.DOC_NO.StartsWith(facSite)).ToList();
            else if (curUser.AUTHORITY_LEVEL % 10 == 0)
                dtoOngoSalesWeightDocs = dtoOngoSalesWeightDocs.Where(aa => aa.DOC_NO.StartsWith(curUser.FAC_SITE)).ToList();
            /* 這段感覺可以優化 改成相依Helper之類 end*/

            //var peSalesWeightNotes = _iPESalesWeightNoteMapper.SalesWeightNoteQueryList<SalesWeightNote>()
            //                      .Map<List<PE_SalesWeightNote>>(curMonthWeightNotes);

            //var lula = dtoOngoSalesWeightDocs.FirstOrDefault();
            //var lula2 = new SalesWeightNote
            //{
            //    UNID = lula.Unid,
            //    CUSTOMER_UNID = lula.CustomerUNID,

            //};
            //var qqd = _iEntityMapperProfile.GetIMapper<SalesWeightNote, DTO_SalesWeightNote>();
            //var hah = qqd.Map<DTO_SalesWeightNote>(lula2);


            //var ingredientLs = _iSalesIngredientService.GetSalesIngredients(
            //    dtoOngoSalesWeightDocs.Select(aa => aa.Unid).ToList());
            //var peSalesIngrediens = _iMapperOfPE_SalesIngredient.SalesWeightNoteQueryList<SalesIngredient>()
            //                                .Map<List<PE_SalesIngredient>>(ingredientLs);


            //var vePurchaseWeightNoteMapper = _mapperHelper.GetMapperOfWeightNoteList<PurchaseWeightNote, VE_PurchaseWeightNote>();
            //var vePurchaseIngredientMapper = _mapperHelper.GetMapperOfWeightNoteList<PurchaseIngredient, VE_PurchaseIngredient>();
            var pageModel = new WeightNoteQueryList
            {
                DTOSalesWeightNotes = dtoOngoSalesWeightDocs,
                // CustomerInfoItems = _customerService.GetCustomerInfos() .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),                nameof(CustomerInfo.CUSTOMER_GUID)),
                // ProductItemItems = _productItemService.GetSalesProductItems().ToPageSelectList(nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_UNID)),
                //PayTypeItems = _codeTableService.GetPayTypeItems().ToPageSelectList(
                //    nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE)),
                //PESalesIngredients = peSalesIngrediens,
                FacSiteItems = PSIEnum.GetAllFacSites().ToPageSelectList(),
                //.ToDictionary(aa => aa.Key, aa => aa.Value.GetDescription()).ToPageSelectList("Value", "Key"),
                UserAuthorityLevel = curUser.AUTHORITY_LEVEL
            };

            //TryUpdateModelAsync<IEmployee>(pageModel); // 比較適合Entity 檢核


            ViewData["Title"] = "當月磅單查詢";
            return View(pageModel);

        }

        [HttpGet]
        [Authorize()]
        public IActionResult QueryList(string sTime = null, string eTime = null, string facSite = null)
        {
            if (!DateTime.TryParse(sTime, out var pStatTime) ||
                !DateTime.TryParse(eTime, out var pETime))
            {
                pStatTime = DateTime.Now.AddDays(1 - DateTime.Now.Day);
                pETime = pStatTime.AddMonths(1);
            }

            var curUser = _userManager.GetUserAsync(User).Result;


            var dtoOngoSalesWeightDocs = _iSalesWeightNoteService.GetDTOOngoSalesWeightDocs();




            /* Rel DTOs */



            /* Set to page model */


            // Basic type property           



            // DTO type property









            if (curUser.AUTHORITY_LEVEL % 10 > 0 &&
                !string.IsNullOrEmpty(facSite) &&
                facSite != "all")
                dtoOngoSalesWeightDocs = dtoOngoSalesWeightDocs.Where(aa => aa.DOC_NO.StartsWith(facSite)).ToList();
            else if (curUser.AUTHORITY_LEVEL % 10 == 0)
                dtoOngoSalesWeightDocs = dtoOngoSalesWeightDocs.Where(aa => aa.DOC_NO.StartsWith(curUser.FAC_SITE)).ToList();

            var pageModel = new WeightNoteQueryList
            {
                DTOSalesWeightNotes = dtoOngoSalesWeightDocs,
                FacSiteItems = PSIEnum.GetAllFacSites().ToPageSelectList(),
                UserAuthorityLevel = curUser.AUTHORITY_LEVEL
            };


            ViewData["Title"] = "當月磅單查詢";
            return View(pageModel);

        }

        [NonAction]
        public WeightNoteCreateWeightNote PageModelOfCreateWeightNote(WeightNoteCreateWeightNote pageModel = null)
        {
            #region -- Function variables --

            #endregion

            #region -- Set page model value process --
            pageModel ??= new WeightNoteCreateWeightNote();

            //pageModel.CarNoItems = _iCarNoService.GetAllCustomerCars()        
            pageModel.CustomerInfoItems = _iCustomerInfoServiceNew.GetDTOSalesCustomerInfo()
                .ToPageSelectList(nameof(DTO_CustomerInfo.CUSTOMER_NAME),
                nameof(DTO_CustomerInfo.CUSTOMER_GUID),
                pageModel.CustomerUNID.ToString());
            pageModel.CarNoItems = _iCarNoServiceNew.GetDTOSalesCustomerCar()
              .ToPageSelectList(nameof(DTO_CustomerCar.CAR_NAME),
              nameof(DTO_CustomerCar.CAR_GUID),
              pageModel.CarNoUNID.ToString());
            pageModel.ProductItemItems = _iProductItemServiceNew.GetDTOSalesProductItems()
                .ToPageSelectList(nameof(DTO_ProductItem.PRODUCT_NAME),
                nameof(DTO_ProductItem.PRODUCT_UNID));



            pageModel.ReceivedTypeItems = _codeTableService.GetReceivedTypeItems().ToPageSelectList(
                    nameof(CodeTable.CODE_TEXT),
                    nameof(CodeTable.CODE_VALUE));
            pageModel.CustomerContractItems = pageModel.CustomerUNID == Guid.Empty ?
                                  new List<SelectListItem>() :
                  _customerContractService.GetSalesCustomerContracts().ToPageSelectList(
                  nameof(CustomerContract.CONTRACT_NAME),
                  nameof(CustomerContract.CONTRACT_GUID),
                  pageModel.ContractUNID.ToString());
            return pageModel;
            #endregion
        }

        [NonAction]
        public WeightNoteUpdateActualData PageModelOfUpdateActualData(WeightNoteUpdateActualData pageModel = null, string unid = null)
        {
            /* Rel DTOs */
            var dtoSalesWeightNote = _iSalesWeightNoteService.GetDTOModel<DTO_SalesWeightNote>(aa => aa.UNID == new Guid(unid));
            //var dtoSalesIngredients = _iSalesIngredientServiceNew.GetDTOModels<DTO_SalesIngredient>(aa => aa.SALES_WEIGHTNOTE_UNID == dtoSalesWeightNote.UNID);

            var dtoCustomerInfo = _iCustomerInfoServiceNew.GetDTOModel<DTO_CustomerInfo>(aa => aa.CUSTOMER_GUID == dtoSalesWeightNote.CUSTOMER_UNID);
            var dtoCustomerCars = _iCarNoServiceNew.GetDTOSalesCustomerCar();
            //var dtoEstimateProductItem = _iProductItemServiceNew.GetDTOModel<DTO_ProductItem>(aa => aa.PRODUCT_UNID == dtoSalesWeightNote.ESTIMATE_PRODUCT_ITEM_UNID);
            var dtoReceivedTypeCodeTables = _codeTableServiceNew.GetReceivedTypeItems();
            var dtoCustomerContract = _iCustomerContractServiceNew.GetSalesCustomerContracts();


            /* Set to page model */
            pageModel ??= new WeightNoteUpdateActualData();
            pageModel.DTOSalesWeightNote = dtoSalesWeightNote;


            // Basic type property   
            //pageModel.SalesIngredients = dtoSalesIngredients
            //                            .Select(aa => $@"{aa.ITEM_NAME}_ {aa.ITEM_PERCENT}%").ToList();

            // DTO type property


            pageModel.EastimateResultPrice = dtoSalesWeightNote.DTO_SalesWeightNoteStepDatas.FirstOrDefault(aa => aa.DATA_STEP == (int)PSIWeightNoteEnum.SWeightNotesStatus.CreateDoc);
            pageModel.ActualResultPrice = dtoSalesWeightNote.DTO_SalesWeightNoteStepDatas.FirstOrDefault(aa => aa.DATA_STEP == (int)PSIWeightNoteEnum.SWeightNotesStatus.Customer);
            //pageModel.DTOSalesWeightNote = dtoSalesWeightNote;
            //pageModel.DTOCustomerCarItems = dtoCustomerCars;
            pageModel.ReceivedTypItems = dtoReceivedTypeCodeTables.ToPageSelectList(nameof(DTO_CodeTable.CODE_TEXT),
                                                               nameof(DTO_CodeTable.CODE_VALUE));
            //pageModel.DTOCustomerContractItems = dtoCustomerContract;

            return pageModel;
        }




    }
}
