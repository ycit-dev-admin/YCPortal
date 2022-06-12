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
using PSI.Core.Extensions;
using PSI.Core.Helpers;
using PSI.Infrastructure.Extensions;
using PSI.Infrastructure.Helpers;
using PSI.Models.VEModels;
using PSI.Service.IService;
using static PSI.Core.Enums.PSIEnum;
using WeightNoteControllerMapper = PSI.Areas.Sales.Mappers.WeightNoteControllerMapper;
using WeightNoteCreateWeightNote = PSI.Areas.Sales.Models.PageModels.WeightNoteCreateWeightNote;
using WeightNoteCreateWeightNoteValidator = PSI.Areas.Sales.Models.PageModels.WeightNoteCreateWeightNoteValidator;

namespace PSI.Areas.Sales.Controllers
{
    [Area("Sales")]
    public class WeightNoteController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPsiService _psiService;
        private readonly ICodeTableService _codeTableService;
        private readonly ICustomerService _customerService;
        private readonly ICustomerInfoService _customerInfoService;
        private readonly ICustomerContractService _customerContractService;
        private readonly IPSIEnumService _pSIEnumService;
        private readonly IProductItemService _productItemService;
        private readonly ICustomerContractEnumService _iCustomerContractEnumService;
        private readonly ICarNoService _iCarNoService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly PurchaseHelper _purchaseHelper;
        private readonly WeightNoteControllerMapper _mapperHelper;


        public WeightNoteController(IMapper mapper,
                                            IPsiService psiService,
                                            ICodeTableService codeTableService,
                                            ICustomerService customerService,
                                            ICustomerContractService customerContractService,
                                            IProductItemService productItemService,
                                            ICustomerInfoService customerInfoService,
                                            ICustomerContractEnumService iCustomerContractEnumService,
                                            IPSIEnumService pSIEnumService,
                                            ICarNoService iCarNoService,
                                            IHttpContextAccessor httpContextAccessor,
                                            UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
            _psiService = psiService;
            _codeTableService = codeTableService;
            _customerService = customerService;
            _customerContractService = customerContractService;
            _productItemService = productItemService;
            _customerInfoService = customerInfoService;
            _pSIEnumService = pSIEnumService;
            _iCustomerContractEnumService = iCustomerContractEnumService;
            _iCarNoService = iCarNoService;
            _httpContextAccessor = httpContextAccessor;
            _purchaseHelper = new PurchaseHelper(_mapper);
            _mapperHelper = new WeightNoteControllerMapper();
            //_haha = haha;
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
            // Action variables
            var errMsg = "";

            // Step Functions 
            #region -- GetPageModel --
            FunctionResult<PageWeightNoteEditWeightNote> GetPageModel()
            {
                var purchaseWeightNote = _psiService.GetPurchaseWeightNote(new Guid(unid));
                var pModelMapperCfg = _mapperHelper.GetPageModelMapper<PurchaseWeightNote, PageWeightNoteEditWeightNote>();
                var pageModel = pModelMapperCfg.Map<PageWeightNoteEditWeightNote>(purchaseWeightNote);

                /* 待改善 */
                pageModel.PayTypeName = _psiService.GetPayTypeItems()
             .FirstOrDefault(item => item.CODE_VALUE == purchaseWeightNote.PAY_TYPE).CODE_TEXT;

                var purchaseIngredients = _psiService.GetPurchaseIngredients(purchaseWeightNote.UNID);
                pageModel.IngredientInfos = purchaseIngredients.Select(item => $@"{item.ITEM_NAME}_{item.ITEM_PERCENT}%").ToArray();





                pageModel.MainIngredientInfo = string.Format("{0}，共{1}項，合計{2}",
                    purchaseIngredients.OrderByDescending(item => item.ITEM_PERCENT).FirstOrDefault().ITEM_NAME,
                    purchaseIngredients.Count(),
                    purchaseIngredients.Sum(aa => aa.ITEM_PERCENT)
                    );

                pageModel.MainIngredientInfo = $@"{purchaseIngredients.OrderByDescending(item => item.ITEM_PERCENT).FirstOrDefault().ITEM_NAME}，
                                              共{  purchaseIngredients.Count()}項，
                                              合計{ purchaseIngredients.Sum(aa => aa.ITEM_PERCENT)}%";
                /* 待改善 */



                var funRs = new FunctionResult<PageWeightNoteEditWeightNote>();
                funRs.ResultSuccess("", pageModel);
                return funRs;
            }
            #endregion


            // Step Result

            return View(GetPageModel().ResultValue);

        }

        [HttpPost]
        [Authorize()]
        public IActionResult CreateWeightNote(WeightNoteCreateWeightNote pageModel)
        {

            // Action variables
            var errMsg = "";
            PurchaseWeightNote rsPurchaseWeightNote;

            // Step Functions 
            #region -- ValidPageModel --
            FunctionResult ValidPageModel(WeightNoteCreateWeightNote pageModel)
            {
                var funRs = new FunctionResult();
                var validator = new WeightNoteCreateWeightNoteValidator();
                var validRs = validator.Validate(pageModel, options => options.IncludeRuleSets("Skip"));

                if (!validRs.IsValid)
                {
                    errMsg = $@"資料驗證失敗，請檢查頁面訊息!! 原因:{string.Join(',', validRs.Errors)}";
                    funRs.ResultFailure(errMsg);
                    return funRs;
                }

                funRs.ResultSuccess("驗證成功");
                return funRs;     // Return Result
            }
            #endregion
            #region -- InsertToDB --
            FunctionResult<PurchaseWeightNote> InsertToDB(WeightNoteCreateWeightNote pageModel)
            {
                var funcRs = new FunctionResult<PurchaseWeightNote>();


                // 合約Log Entity
                CustomerContractLog rsCustomerContractLog = null;
                if (!(pageModel.ContractUNID == Guid.Empty))
                {
                    var customerContractMapper = _mapperHelper.GetMapperOfCreateWeightNote<WeightNoteCreateWeightNote, CustomerContractLog>();
                    rsCustomerContractLog = customerContractMapper.Map<CustomerContractLog>(pageModel);
                    //rsCustomerContractLog = _customerContractService.CreateCustomerContractLog(customerContractLog,
                    //    _userManager.GetUserAsync(User).Result).ResultValue;
                }


                CustomerInfo tempCustomerInfo = null;
                // 客戶資訊Entity 
                if (pageModel.CustomerUNID == Guid.Empty) // 臨時客戶
                {
                    var customerInfoMapper = _mapperHelper.GetMapperOfCreateWeightNote<WeightNoteCreateWeightNote, CustomerInfo>();
                    tempCustomerInfo = customerInfoMapper.Map<CustomerInfo>(pageModel);
                    // tempCustomerInfo = _customerService.CreateCustomerInfo(customerInfo, _userManager.GetUserAsync(User).Result).ResultValue;
                }
                //else
                // rsCustomerInfo = _customerService.GetCustomerInfo(new Guid(pageModel.CustomerUNID));

                // 車牌資訊 Entity
                CustomerCar tempCustomerCar = null;
                if (pageModel.CarNoUNID == "0") // 臨時車牌
                {
                    var customerCarMapper = _mapperHelper.GetMapperOfCreateWeightNote<WeightNoteCreateWeightNote, CustomerCar>();
                    tempCustomerCar = customerCarMapper.Map<CustomerCar>(pageModel);
                    // tempCustomerCar = _customerService.CreateCustomerCar(customerCar, _userManager.GetUserAsync(User).Result).ResultValue;
                }
                //else
                //  rsCustomerCar = _customerService.GetCustomerCarByUNID(new Guid(pageModel.CarNoUNID));

                // Create 進貨磅單  & 進貨組成資訊產生
                var purchaseWeightNoteMapper = _mapperHelper.GetMapperOfCreateWeightNote<WeightNoteCreateWeightNote, PurchaseWeightNote>();
                var purchaseIngredientMapper = _mapperHelper.GetMapperOfCreateWeightNote<VE_PurchaseIngredient, PurchaseIngredient>();
                var purchaseWeightNote = purchaseWeightNoteMapper.Map<PurchaseWeightNote>(pageModel);
                var purchaseIngredientList = purchaseIngredientMapper.Map<List<PurchaseIngredient>>(pageModel.VE_PurchaseIngredientLs);

                // Create 進貨磅單  Logic
                funcRs = _psiService.CreatePurchaseWeightNoteForNormal(purchaseWeightNote,
                                                              purchaseIngredientList,
                                                              _userManager.GetUserAsync(User).Result,
                                                              _customerContractService,
                                                              _customerService,
                                                              tempCustomerInfo,
                                                              tempCustomerCar,
                                                              rsCustomerContractLog);
                if (!funcRs.Success)
                    errMsg = funcRs.ErrorMessage;


                rsPurchaseWeightNote = funcRs.ResultValue;
                return funcRs;     // Return Result
            }
            #endregion


            // Step Result
            if (!ValidPageModel(pageModel).Success ||
                !InsertToDB(pageModel).Success)
            {
                TempData["pageMsg"] = errMsg;


                //pageModel.ContractTypeItems = _psiService.GetContractTypeItems()
                //  .ToPageSelectList(nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE), pageModel.ContractType);
                //pageModel.CustomerInfoItems = _customerService.GetCustomerInfos()
                //    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID), pageModel.CustomerGUID.ToString());
                //pageModel.ProductItems = _productItemService.GetAllProductItems().ToPageSelectList(
                //    nameof(ProductItem.PRODUCT_NAME), nameof(ProductItem.PRODUCT_UNID), pageModel.ProductGUID.ToString());

                pageModel.CustomerInfoItems = _customerService.GetCustomerInfos()
                    .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME), nameof(CustomerInfo.CUSTOMER_GUID), pageModel.CustomerUNID.ToString());
                pageModel.ProductItemItems = _productItemService.GetPurchaseProductItems(_pSIEnumService)
                    .ToPageSelectList(nameof(ProductItem.PRODUCT_NAME),
                    nameof(ProductItem.PRODUCT_UNID));
                pageModel.ReceivedTypeItems = _codeTableService.GetPayTypeItems().ToPageSelectList(
                    nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE), pageModel.PayType);
                pageModel.CustomerContractItems = pageModel.CustomerUNID == Guid.Empty ?
                                    new List<SelectListItem>() :
                    _customerContractService.GetPurchaseCustomerContracts(_iCustomerContractEnumService).ToPageSelectList(
                    nameof(CustomerContract.CONTRACT_NAME),
                    nameof(CustomerContract.CONTRACT_GUID),
                    pageModel.ContractUNID.ToString());


                return View(pageModel);
            }


            // Successed
            TempData["pageMsg"] = $@"磅單:{rsPurchaseWeightNote.DOC_NO} 建立成功!!";
            return RedirectToAction(nameof(WeightNoteController.QueryList));



            //'new -------------------------------------





            //var validator = new VM_PurchaseWeightNoteValidator();
            //var validRs = validator.Validate(vmPurchaseWeightNote);
            //var validRs = validator.Validate(vmPurchaseWeightNote, options => options.IncludeRuleSets("Create"));

            //pageModel.CustomerInfoItems = _purchaseHelper.PageGetCustomerInfoItems(_customerService);
            //pageModel.ProductItemItems = _purchaseHelper.PageGetProductItems(_productItemService);
            if (!ModelState.IsValid)
            {
                TempData["pageMsg"] = $"資料驗證失敗，請檢查頁面訊息!!";
                return View(pageModel);
            }




            var purchaseHelper = new PurchaseHelper(_mapper);
            var pEntityHelper = new PurchaseEntityHelper(_mapper, _psiService);
            var userInfo = _userManager.GetUserAsync(User).Result;
            var docNo = _psiService.GetWeightNoteDocNo(userInfo.FAC_SITE, PSIType.Purchase);
            // var purchaseWeightNote = pEntityHelper.GetPurchaseWeightNote_Create(pageModel.VE_PurchaseWeightNote, docNo);  // 磅單
            var purchaseWeightNote = new PurchaseWeightNote();


            //var vePurchaseIngredientLs = JsonSerializer.Deserialize<List<VE_PurchaseIngredient>>(pageModel.SelectPurchaseDetailInfos);
            var vePurchaseIngredientLs = pageModel.VE_PurchaseIngredientLs;
            var purchaseIngredientLs = purchaseHelper.GetPurchaseIngredientLs(vePurchaseIngredientLs); // 進貨品項

            var createRs = _psiService.CreatePurchaseWeightNoteForNormal(
                purchaseWeightNote,
                purchaseIngredientLs,
                userInfo,
                _customerContractService,
                _customerService);

            if (purchaseWeightNote.CUSTOMER_UNID == Guid.Empty)
            {
                // 建立臨時客戶
                var customerInfo = new CustomerInfo
                {
                    COMPANY_NAME = "TempCompany",
                    //CUSTOMER_NAME = pageModel.VE_PurchaseWeightNote.CustomerName
                };

                // 建立臨時車牌
                var customerCarLs = new List<CustomerCar> {new CustomerCar {
                    //CAR_NAME = pageModel.VE_PurchaseWeightNote.CarNo
                } };

                _customerService.CreateCustomerInfoForNormal(customerInfo, _userManager.GetUserAsync(User).Result);
            }



            if (!createRs.Success)
            {
                TempData["pageMsg"] = createRs.ActionMessage;
                return View(pageModel);
            }



            TempData["pageMsg"] = $@"單號:{createRs.ResultValue.DOC_NO}，建立成功!!";
            return RedirectToAction("WeightNoteList");
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

            var curMonthPWeightNotes = _psiService.GetPurchaseWeightNotes(pStatTime, pETime);
            if (curUser.AUTHORITY_LEVEL % 10 > 0 &&
                !string.IsNullOrEmpty(facSite) &&
                facSite != "all")
                curMonthPWeightNotes = curMonthPWeightNotes.Where(aa => aa.DOC_NO.StartsWith(facSite));
            else if (curUser.AUTHORITY_LEVEL % 10 == 0)
                curMonthPWeightNotes = curMonthPWeightNotes.Where(aa => aa.DOC_NO.StartsWith(curUser.FAC_SITE));




            var vePurchaseIngredientMapper = _mapperHelper.GetMapperOfWeightNoteList<PurchaseIngredient, VE_PurchaseIngredient>();
            var pIngredientLs = _psiService.GetPurchaseIngredients(curMonthPWeightNotes.Select(aa => aa.UNID).ToList());


            var vePurchaseWeightNoteMapper = _mapperHelper.GetMapperOfWeightNoteList<PurchaseWeightNote, VE_PurchaseWeightNote>();

            var pageModel = new WeightNoteQueryList
            {
                VE_PurchaseWeightNoteLs = vePurchaseWeightNoteMapper.Map<List<VE_PurchaseWeightNote>>(curMonthPWeightNotes),
                CustomerInfoItems = _customerService.GetCustomerInfos()
                .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
                nameof(CustomerInfo.CUSTOMER_GUID)),
                ProductItemItems = _productItemService.GetSalesProductItems(_pSIEnumService)
                .ToPageSelectList(nameof(ProductItem.PRODUCT_NAME),
                nameof(ProductItem.PRODUCT_UNID)),
                PayTypeItems = _codeTableService.GetPayTypeItems().ToPageSelectList(
                    nameof(CodeTable.CODE_TEXT), nameof(CodeTable.CODE_VALUE)),
                PIngredientLs = vePurchaseIngredientMapper.Map<List<VE_PurchaseIngredient>>(pIngredientLs),
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
            pageModel ??= new WeightNoteCreateWeightNote();

            //pageModel.CarNoItems = _iCarNoService.GetAllCustomerCars()
            pageModel.CustomerInfoItems = _customerInfoService.GetSalesCustomerInfo(_pSIEnumService)
                .ToPageSelectList(nameof(CustomerInfo.CUSTOMER_NAME),
                nameof(CustomerInfo.CUSTOMER_GUID),
                pageModel.CustomerUNID.ToString());
            pageModel.CarNoItems = _iCarNoService.GetSalesOfCarInfo(_pSIEnumService)
                .ToPageSelectList(nameof(CustomerCar.CAR_NAME),
                nameof(CustomerCar.CAR_GUID),
                pageModel.CarNo);

            pageModel.ProductItemItems = _productItemService.GetSalesProductItems(_pSIEnumService)
                .ToPageSelectList(nameof(ProductItem.PRODUCT_NAME),
                nameof(ProductItem.PRODUCT_UNID));
            pageModel.ReceivedTypeItems = _codeTableService.GetPayTypeItems().ToPageSelectList(
                    nameof(CodeTable.CODE_TEXT),
                    nameof(CodeTable.CODE_VALUE));
            pageModel.CustomerContractItems = pageModel.CustomerUNID == Guid.Empty ?
                                  new List<SelectListItem>() :
                  _customerContractService.GetSalesCustomerContracts(_iCustomerContractEnumService).ToPageSelectList(
                  nameof(CustomerContract.CONTRACT_NAME),
                  nameof(CustomerContract.CONTRACT_GUID),
                  pageModel.ContractUNID.ToString());
            return pageModel;
        }

        [NonAction]
        public IMapper MapperForCreateWeightNote<T1, T2>()
        {
            switch (typeof(T1).Name, typeof(T2).Name)
            {
                case (nameof(CustomerCar), nameof(VE_CustomerCar)):
                    return new MapperConfiguration(cfg =>
                    cfg.CreateMap<CustomerCar, VE_CustomerCar>()
                      // .ForMember(t => t.InsideCarName, s => s.MapFrom(o => o.PurchaseWeightNoteUNID))                      
                      ).CreateMapper();
                default:
                    return null;
            }
        }


    }
}
