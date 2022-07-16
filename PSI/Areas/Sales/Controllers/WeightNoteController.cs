using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.Purchase.Helpers;
using PSI.Areas.Purchase.Models.PageModels;
using PSI.Areas.Sales.Models.PageModels;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Enums;
using PSI.Core.Extensions;
using PSI.Core.Helpers;
using PSI.EntityValidators;
using PSI.Infrastructure.Extensions;
using PSI.Infrastructure.Helpers;
using PSI.Mappgins.Interface;
using PSI.Models.PEModels;
using PSI.Models.VEModels;
using PSI.Service.IHelper;
using PSI.Service.IService;
using static PSI.Core.Enums.PSIEnum;
using WeightNoteControllerMapper = PSI.Areas.Sales.Mappers.WeightNoteControllerMapper;
using WeightNoteCreateWeightNote = PSI.Areas.Sales.Models.PageModels.WeightNoteCreateWeightNote;

namespace PSI.Areas.Sales.Controllers
{
    [Area("Sales")]
    public class WeightNoteController : Controller
    {
        // Other
        //private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<AppUser> _userManager;

        // Service
        private readonly ISalesWeightNoteService _iSalesWeightNoteService;
        private readonly ICodeTableService _codeTableService;
        private readonly ICustomerService _customerService;
        private readonly IPsiService _psiService;
        private readonly ICustomerInfoService _customerInfoService;
        private readonly ICustomerContractService _customerContractService;
        private readonly IProductItemService _productItemService;
        private readonly ICarNoService _iCarNoService;
        private readonly ISalesIngredientService _iSalesIngredientService;
        // Mapper
        private readonly IMapperOfSalesWeightNote _iMapperOfSalesWeightNote;
        private readonly IMapperOfSalesIngredient _iMapperOfSalesIngredient;
        private readonly IMapperOfSalesWeightNoteResultPrice _iMapperOfSalesWeightNoteResultPrice;
        private readonly IPESalesWeightNoteMapper _iPESalesWeightNoteMapper;
        private readonly IMapperOfPE_SalesIngredient _iMapperOfPE_SalesIngredient;
        private readonly IPageModelMapper _iPageModelMapper;

        // Helper
        private readonly ISalesPriceCaculateHelper _iSalesPriceCaculateHelper;

        // 準備移除
        private readonly IPSIEnumService _pSIEnumService;
        private readonly ICustomerContractEnumService _iCustomerContractEnumService;
        private readonly WeightNoteControllerMapper _mapperHelper;


        public WeightNoteController(IPsiService psiService,
                                    ICodeTableService codeTableService,
                                    ISalesWeightNoteService iSalesWeightNoteService,
                                    ICustomerService customerService,
                                    ICustomerContractService customerContractService,
                                    IProductItemService productItemService,
                                    ICustomerInfoService customerInfoService,
                                    ICustomerContractEnumService iCustomerContractEnumService,
                                    IPSIEnumService pSIEnumService,
                                    IMapperOfSalesIngredient iMapperOfSalesIngredient,
                                    ICarNoService iCarNoService,
                                    ISalesPriceCaculateHelper iSalesPriceCaculateHelper,
                                    IMapperOfSalesWeightNote iMapperOfSalesWeightNote,
                                    IMapperOfSalesWeightNoteResultPrice iMapperOfSalesWeightNoteResultPrice,
                                    IHttpContextAccessor httpContextAccessor,
                                    ISalesIngredientService iSalesIngredientService,
                                    IPESalesWeightNoteMapper iPESalesWeightNoteMapper,
                                    IMapperOfPE_SalesIngredient iMapperOfPE_SalesIngredient,
                                    IPageModelMapper iPageModelMapper,
                                    UserManager<AppUser> userManager)
        {
            // Other
            _userManager = userManager;
            // Service
            _iSalesWeightNoteService = iSalesWeightNoteService;
            _iSalesIngredientService = iSalesIngredientService;
            _psiService = psiService;
            _codeTableService = codeTableService;
            _customerService = customerService;
            _customerContractService = customerContractService;
            _productItemService = productItemService;
            _customerInfoService = customerInfoService;
            _iCarNoService = iCarNoService;
            _iPESalesWeightNoteMapper = iPESalesWeightNoteMapper;
            // Mapper
            _iMapperOfSalesWeightNoteResultPrice = iMapperOfSalesWeightNoteResultPrice;
            _iMapperOfSalesIngredient = iMapperOfSalesIngredient;
            _iMapperOfSalesWeightNote = iMapperOfSalesWeightNote;
            _iMapperOfPE_SalesIngredient = iMapperOfPE_SalesIngredient;
            _iPageModelMapper = iPageModelMapper;

            // Helper
            _iSalesPriceCaculateHelper = iSalesPriceCaculateHelper;

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

            return View(GetPModelOfCreateWeightNote());
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
            // 用Unid去查出該筆的SalesWeightNote
            var salesWeightNote = _iSalesWeightNoteService.GetSalesWeightNote(new Guid(unid));
            // Mapper成關聯 peModel
            var peSalesWeightNote = _iPESalesWeightNoteMapper.GetUpdateActualDataMapper<SalesWeightNote>()
                .Map<PE_SalesWeightNote>(salesWeightNote);

            var pageModel = _iPageModelMapper.GetModel<WeightNoteUpdateActualData>(salesWeightNote);
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
            //return View(GetUpdateActualDataPModel(pageModel));
            return View(pageModel);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult CreateWeightNote(WeightNoteCreateWeightNote pageModel)
        {
            /* Action variables */
            var stepErrMsg = "";
            var operUser = _userManager.GetUserAsync(User).Result;



            // ValidEntities
            // Insert Table

            /* Step Functions */
            bool TurnToEntities(out SalesWeightNote salesWeightNote,
                out List<SalesIngredient> salesIngredients,
                out SalesWeightNoteResultPrice salesWeightNoteResultPrice,
                out string errMsg)
            {
                salesWeightNote = _iMapperOfSalesWeightNote.SalesWeightNoteCreate<WeightNoteCreateWeightNote>()
                                      .Map<SalesWeightNote>(pageModel);
                salesIngredients = _iMapperOfSalesIngredient.SalesWeightNoteCreate<PE_SalesIngredient>()
                                   .Map<List<SalesIngredient>>(pageModel.PESalesIngredientList);
                salesWeightNoteResultPrice = _iMapperOfSalesWeightNoteResultPrice.SalesWeightNoteCreate<WeightNoteCreateWeightNote>()
                                             .Map<SalesWeightNoteResultPrice>(pageModel);

                var ddd = _iMapperOfSalesIngredient.SalesWeightNoteCreate<PE_SalesIngredient>()
                                   .Map<List<SalesIngredient>>(pageModel.PESalesIngredientList);

                errMsg = "";
                return true;
            }
            bool ValidEntities(in SalesWeightNote argSalesWeightNote,
                in List<SalesIngredient> argSalesIngredientList,
                in SalesWeightNoteResultPrice argSalesWeightNoteResultPrice,
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
                in SalesWeightNoteResultPrice argSalesWeightNoteResultPrice,
                out SalesWeightNote rsSalesWeightNote,
                out string errMsg)
            {




                // Create 進貨磅單  Logic
                var funcRs = _iSalesWeightNoteService.CreateSalesWeightNote(argSalesWeightNote,
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
                return View(GetPModelOfCreateWeightNote(pageModel));
            }


            // Successed
            TempData["pageMsg"] = $@"磅單:{rsSalesWeightNote.DOC_NO} 建立成功!!";
            return RedirectToAction(nameof(WeightNoteController.QueryList));

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

            /* 這段感覺可以優化 改成相依Helper之類 */
            var curMonthWeightNotes = _iSalesWeightNoteService.GetOngoSalesWeightDocs();
            if (curUser.AUTHORITY_LEVEL % 10 > 0 &&
                !string.IsNullOrEmpty(facSite) &&
                facSite != "all")
                curMonthWeightNotes = curMonthWeightNotes.Where(aa => aa.DOC_NO.StartsWith(facSite));
            else if (curUser.AUTHORITY_LEVEL % 10 == 0)
                curMonthWeightNotes = curMonthWeightNotes.Where(aa => aa.DOC_NO.StartsWith(curUser.FAC_SITE));
            /* 這段感覺可以優化 改成相依Helper之類 end*/

            var peSalesWeightNotes = _iPESalesWeightNoteMapper.SalesWeightNoteQueryList<SalesWeightNote>()
                                  .Map<List<PE_SalesWeightNote>>(curMonthWeightNotes);

            var ingredientLs = _iSalesIngredientService.GetSalesIngredients(
                curMonthWeightNotes.Select(aa => aa.UNID).ToList());
            var peSalesIngrediens = _iMapperOfPE_SalesIngredient.SalesWeightNoteQueryList<SalesIngredient>()
                                            .Map<List<PE_SalesIngredient>>(ingredientLs);


            //var vePurchaseWeightNoteMapper = _mapperHelper.GetMapperOfWeightNoteList<PurchaseWeightNote, VE_PurchaseWeightNote>();
            //var vePurchaseIngredientMapper = _mapperHelper.GetMapperOfWeightNoteList<PurchaseIngredient, VE_PurchaseIngredient>();
            var pageModel = new WeightNoteQueryList
            {
                PE_SalesWeightNoteData = peSalesWeightNotes,
                // CustomerInfoItems = _customerService.GetCustomerInfos() .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),                nameof(CustomerInfo.CUSTOMER_GUID)),
                // ProductItemItems = _productItemService.GetSalesProductItems().ToPageSelectList(nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_UNID)),
                PayTypeItems = _codeTableService.GetPayTypeItems().ToPageSelectList(
                    nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE)),
                PESalesIngredients = peSalesIngrediens,
                FacSiteItems = _psiService.GetFacSites()
                .ToDictionary(aa => aa.Key, aa => aa.Value.GetDescription()).ToPageSelectList("Value", "Key"),
                UserAuthorityLevel = curUser.AUTHORITY_LEVEL
            };

            //TryUpdateModelAsync<IEmployee>(pageModel); // 比較適合Entity 檢核


            ViewData["Title"] = "當月磅單查詢";
            return View(pageModel);

        }

        [NonAction]
        public WeightNoteCreateWeightNote GetPModelOfCreateWeightNote(WeightNoteCreateWeightNote pageModel = null)
        {
            #region -- Function variables --

            #endregion

            #region -- Set page model value process --
            pageModel ??= new WeightNoteCreateWeightNote();

            //pageModel.CarNoItems = _iCarNoService.GetAllCustomerCars()
            pageModel.CustomerInfoItems = _customerInfoService.GetSalesCustomerInfo()
                .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
                nameof(CustomerInfo.CUSTOMER_GUID),
                pageModel.CustomerUNID.ToString());
            pageModel.CarNoItems = _iCarNoService.GetSalesOfCarInfo()
                .ToPageSelectList(nameof(CustomerCar.CAR_NAME),
                nameof(CustomerCar.CAR_GUID),
                pageModel.CarNoUNID.ToString());
            pageModel.ProductItemItems = _productItemService.GetSalesProductItems()
                .ToPageSelectList(nameof(ProductItem.PRODUCT_NAME),
                nameof(ProductItem.PRODUCT_UNID));
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
        public WeightNoteUpdateActualData GetUpdateActualDataPModel(WeightNoteUpdateActualData pageModel = null)
        {
            /* Function variables */

            pageModel ??= new WeightNoteUpdateActualData();

            //pageModel.CarNoItems = _iCarNoService.GetAllCustomerCars()
            pageModel.CustomerInfoItems = _customerInfoService.GetSalesCustomerInfo()
                .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
                nameof(CustomerInfo.CUSTOMER_GUID),
                pageModel.CustomerUNID.ToString());
            pageModel.CarNoItems = _iCarNoService.GetSalesOfCarInfo()
                .ToPageSelectList(nameof(CustomerCar.CAR_NAME),
                nameof(CustomerCar.CAR_GUID),
                pageModel.CarNoUNID.ToString());
            pageModel.ProductItemItems = _productItemService.GetSalesProductItems()
                .ToPageSelectList(nameof(ProductItem.PRODUCT_NAME),
                nameof(ProductItem.PRODUCT_UNID));
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
        }




    }
}
