using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.Sales.Models.PageModels;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Extensions;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.EntityValidators;
using PSI.Helpers.IHelper;
using PSI.Infrastructure.Extensions;
using PSI.Mappgins.Interface;
using PSI.Models.PEModels;
using PSI.Service.IHelper;
using PSI.Service.ILogic;
using PSI.Service.IMapperProfile;
using PSI.Service.IService;
using PSI.Service.Logic;
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
                                    IUnitOfWork unitOfWork)
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
            // Mapper
            _iMapperOfSalesWeightNoteResultPrice = iMapperOfSalesWeightNoteResultPrice;
            _iMapperOfSalesIngredient = iMapperOfSalesIngredient;
            _iMapperOfSalesWeightNote = iMapperOfSalesWeightNote;
            _iMapperOfPE_SalesIngredient = iMapperOfPE_SalesIngredient;
            _iPageModelMapper = iPageModelMapper;

            // Helper
            _iSalesPriceCaculateHelper = iSalesPriceCaculateHelper;
            _iMapperHelper = iMapperHelper;

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

            // DB邏輯
            var operUser = _userManager.GetUserAsync(User).Result;
            // ---------------- new
            var saleWeightNote = _iMapperHelper.MapTo<WeightNoteCreateWeightNote, SalesWeightNote>(pageModel);
            saleWeightNote.DOC_NO = _psiService.GetWeightNoteDocNo(operUser.FAC_SITE, PSIEnum.PSIType.Sale);
            saleWeightNote.CREATE_EMPNO = operUser.EMPLOYEE_NO;
            saleWeightNote.UPDATE_EMPNO = operUser.EMPLOYEE_NO;
            _iSalesWeightNoteService.CreateEntityByDTOModelNoSave(saleWeightNote);

            var salesIngredients = _iMapperHelper.MapTo<DTO_PS_WreteOff_Record, PS_WreteOff_Record>(pageModel.DTOPSWreteOffRecords);
            salesIngredients.ForEach(item =>
            {
                item.SALES_WEIGHTNOTE_UNID = saleWeightNote.UNID;
                item.CREATE_EMPNO = operUser.NICK_NAME;
                item.UPDATE_EMPNO = operUser.NICK_NAME;
            });

            _iSalesIngredientServiceNew.CreateEntityByDTOModelNoSave(pageModel.DTOPSWreteOffRecords);

            var commitRs = _unitOfWork.SaveChange();  // 都沒有問題在建立

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
            bool TurnToEntities(out SalesWeightNote salesWeightNote,
                out List<SalesIngredient> salesIngredients,
                out SalesWeightNoteStepData salesWeightNoteResultPrice,
                out string errMsg)
            {
                salesWeightNote = _iMapperOfSalesWeightNote.SalesWeightNoteCreate<WeightNoteCreateWeightNote>()
                                      .Map<SalesWeightNote>(pageModel);
                salesIngredients = _iMapperOfSalesIngredient.SalesWeightNoteCreate<PE_SalesIngredient>()
                                   .Map<List<SalesIngredient>>(pageModel.DTOPSWreteOffRecords);
                salesWeightNoteResultPrice = _iMapperOfSalesWeightNoteResultPrice.SalesWeightNoteCreate<WeightNoteCreateWeightNote>()
                                             .Map<SalesWeightNoteStepData>(pageModel);

                var ddd = _iMapperOfSalesIngredient.SalesWeightNoteCreate<PE_SalesIngredient>()
                                   .Map<List<SalesIngredient>>(pageModel.DTOPSWreteOffRecords);

                errMsg = "";
                return true;
            }
            bool ValidEntities(in SalesWeightNote argSalesWeightNote,
                in List<SalesIngredient> argSalesIngredientList,
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
            bool InsertToDB(in SalesWeightNote argSalesWeightNote,
                in List<SalesIngredient> argSalesIngredientList,
                in SalesWeightNoteStepData argSalesWeightNoteResultPrice,
                out SalesWeightNote rsSalesWeightNote,
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
