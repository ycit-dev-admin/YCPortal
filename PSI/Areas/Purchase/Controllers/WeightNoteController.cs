using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PSI.Areas.Purchase.Helpers;
using PSI.Areas.Purchase.Models.PageModels;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Infrastructure.Helpers;
using PSI.Models.VEModels;
using PSI.Service.IService;
using static PSI.Core.Enums.PSIEnum;

namespace PSI.Controllers
{
    [Area("Purchase")]
    public class WeightNoteController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPsiService _psiService;
        private readonly ICustomerService _customerService;
        private readonly IProductItemService _productItemService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly PurchaseHelper _purchaseHelper;
        private readonly PurchasePageItemHelper _pageitemHelper;


        public WeightNoteController(IMapper mapper,
                                            IPsiService psiService,
                                            ICustomerService customerService,
                                            IProductItemService productItemService,
                                            IHttpContextAccessor httpContextAccessor,
                                            UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
            _psiService = psiService;
            _customerService = customerService;
            _productItemService = productItemService;
            _httpContextAccessor = httpContextAccessor;
            _purchaseHelper = new PurchaseHelper(_mapper);
            _pageitemHelper = new PurchasePageItemHelper();
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
            ViewData["Title"] = "進貨磅單建立";
            // string host = _httpContextAccessor.HttpContext.Request.Host.Value;  //能夠取得Host Domain Name

            var itemHelper = new PurchasePageItemHelper();
            var pageModel = new Page_Purchase_CreateWeightNote
            {
                CustomerInfoItems = itemHelper.PageGetCustomerInfoItems(_customerService.GetPurchaseCustomerInfo()),
                ProductItemItems = itemHelper.PageGetProductItems(_productItemService.GetPurchaseProductItems()),
                PayTypeItems = itemHelper.PageGetPayTypeItems(_psiService.GetPsiTypeItems())
            };
            return View(pageModel);
        }

        [HttpGet]
        [Authorize()]
        // [RuleSetForClientSideMessages("Skip")]
        public IActionResult EditWeightNote(string docNo)
        {


            var purchaseWeightNote = _psiService.GetPurchaseWeightNote(docNo);
            var pageModel = _mapper.Map<PageWeightNoteEditWeightNote>(purchaseWeightNote);
            pageModel.PayTypeName = _psiService.GetPayTypeItems()
                .FirstOrDefault(item => item.CodeValue == purchaseWeightNote.PayType).CodeText;

            var purchaseIngredients = _psiService.GetPurchaseIngredients(purchaseWeightNote.Id);
            pageModel.IngredientInfos = purchaseIngredients.Select(item => $@"{item.ItemName}_{item.ItemPercent}%").ToArray();



            pageModel.MainIngredientInfo = string.Format("{0}，共{1}項，合計{2}",
                purchaseIngredients.OrderByDescending(item => item.ItemPercent).FirstOrDefault().ItemName,
                purchaseIngredients.Count(),
                purchaseIngredients.Sum(aa => aa.ItemPercent)
                );

            pageModel.MainIngredientInfo = $@"{purchaseIngredients.OrderByDescending(item => item.ItemPercent).FirstOrDefault().ItemName}，
                                              共{  purchaseIngredients.Count()}項，
                                              合計{ purchaseIngredients.Sum(aa => aa.ItemPercent)}%";

            //ViewData["Title"] = $@"{pageModel.DocNo}進貨磅單細項 ({pageModel.DocNo}) 磅單時間 : {pageModel.FullWeightTime.ToString("yyyy-MM-dd HH:mm:ss")} ";
            //pageModel.CustomerInfoItems = _pageitemHelper.PageGetCustomerInfoItems(_customerService.GetPurchaseCustomerInfo());
            //pageModel.ProductItemItems = _pageitemHelper.PageGetProductItems(_productItemService.GetPurchaseProductItems());
            //pageModel.PayTypeItems = _pageitemHelper.PageGetPayTypeItems(_psiService.GetPsiTypeItems());

            // VEPurchaseWeightNoteQuery = _mapper.Map<VE_PurchaseWeightNote_Query>(purchaseWeightNote),


            //var abc = pageModel.VEPurchaseWeightNoteQuery.DocNo;


            //var mainIndegried = _psiService.GetMainPurchaseIngredient(purchaseWeightNote.Id);



            return View(pageModel);
        }

        [HttpPost]
        [Authorize()]
        public IActionResult CreateWeightNote(Page_Purchase_CreateWeightNote pageModel)
        {
            //var validator = new VM_PurchaseWeightNoteValidator();
            //var validRs = validator.Validate(vmPurchaseWeightNote);

            //var validRs = validator.Validate(vmPurchaseWeightNote, options => options.IncludeRuleSets("Create"));
            pageModel.CustomerInfoItems = _purchaseHelper.PageGetCustomerInfoItems(_customerService);
            pageModel.ProductItemItems = _purchaseHelper.PageGetProductItems(_productItemService);
            if (!ModelState.IsValid)
            {
                TempData["pageMsg"] = $"資料驗證失敗，請檢查頁面訊息!!";
                return View(pageModel);
            }




            var purchaseHelper = new PurchaseHelper(_mapper);
            var pEntityHelper = new PurchaseEntityHelper(_mapper);
            var userInfo = _userManager.GetUserAsync(User).Result;
            var docNo = _psiService.GetDocNo(userInfo.FacSite, (int)PSIType.Purchase);
            var purchaseWeightNote = pEntityHelper.GetPurchaseWeightNote_Create(pageModel.VE_PurchaseWeightNote, docNo);  // 磅單
                                                                                                                          //var vePurchaseIngredientLs = JsonSerializer.Deserialize<List<VE_PurchaseIngredient>>(pageModel.SelectPurchaseDetailInfos);
            var vePurchaseIngredientLs = pageModel.VE_PurchaseIngredientLs;
            var purchaseIngredientLs = purchaseHelper.GetPurchaseIngredientLs(vePurchaseIngredientLs); // 進貨品項

            var createRs = _psiService.CreatePurchaseWeightNote(
                purchaseWeightNote,
                purchaseIngredientLs,
                userInfo);

            if (purchaseWeightNote.CustomerId == 0)
            {
                // 建立臨時客戶
                var customerInfo = new CustomerInfo
                {
                    CompanyName = "TempCompany",
                    CustomerName = pageModel.VE_PurchaseWeightNote.CustomerName
                };

                // 建立臨時車牌
                var customerCarLs = new List<CustomerCar> {new CustomerCar {
                    CarName = pageModel.VE_PurchaseWeightNote.CarNo
                } };

                _customerService.CreateCustomerInfo(customerInfo, customerCarLs);
            }



            if (!createRs.Success)
            {
                TempData["pageMsg"] = createRs.ActionMessage;
                return View(pageModel);
            }



            TempData["pageMsg"] = $@"單號:{createRs.ResultValue.DocNo}，建立成功!!";
            return RedirectToAction("WeightNoteList");
        }

        [HttpGet]
        [Authorize()]
        public IActionResult WeightNoteList(string sTime = null, string eTime = null)
        {
            if (!DateTime.TryParse(sTime, out var pStatTime) ||
                !DateTime.TryParse(eTime, out var pETime))
            {
                pStatTime = DateTime.Now.AddDays(1 - DateTime.Now.Day);
                pETime = pStatTime.AddMonths(1);
            }

            var curMonthPWeightNotes = _psiService.GetPurchaseWeightNotes(pStatTime, pETime);


            var pIngredientLs = _psiService.GetPurchaseIngredients(curMonthPWeightNotes.Select(aa => aa.Id).ToList());
            var pageModel = new Page_Purchase_WeightNoteList
            {
                VE_PurchaseWeightNoteLs = _mapper.Map<List<VE_PurchaseWeightNote>>(curMonthPWeightNotes),
                CustomerInfoItems = _purchaseHelper.PageGetCustomerInfoItems(_customerService),
                ProductItemItems = _purchaseHelper.PageGetProductItems(_productItemService),
                PayTypeItems = _purchaseHelper.PageGetPayTypeItems(_psiService),
                PIngredientLs = pIngredientLs.ToList()
            };

            //TryUpdateModelAsync<IEmployee>(pageModel); // 比較適合Entity 檢核


            ViewData["Title"] = "當月磅單查詢";
            return View(pageModel);
            //var qq = ingredientLs.ToList();
            //var toDict = qq.Select(item => new { id = item.Id, obj = item })
            //    .ToDictionary(x => x.id, x => x.obj);

            //var pageModel2 = new Page_Purchase_WeightNoteList
            //{
            //    VE_PurchaseWeightNoteLs = curMonthPWeightNotes.Select(weightNote =>
            //    {
            //        var temp = _mapper.Map<VE_PurchaseWeightNote>(weightNote);
            //        temp
            //        return
            //    }) _mapper.Map<List<VE_PurchaseWeightNote>>(curMonthPWeightNotes),
            //    CustomerInfoItems = _purchaseHelper.PageGetCustomerInfoItems(_customerService),
            //    ProductItemItems = _purchaseHelper.PageGetProductItems(_productItemService)
            //};



            // pageModel.ProductItemItems = _purchaseHelper.PageGetProductItems(_productItemService);



            //var vmModel2 = curMonthPWeightNotes.Select(aa => new VM_PurchaseWeightNote
            //{
            //    CarNoName = aa.CarNo,
            //    TradeWeight = aa.TradeWeight,
            //    UnitPrice = aa.UnitPrice.ToString(),
            //    ActualPrice = aa.ActualPrice,
            //    DefectiveWeight = aa.DefectiveWeight.ToString(),
            //    PayType = aa.PayType,
            //    CreateEmpNo = aa.CreateEmpNo,
            //    Remark = aa.Remark,
            //    EffectiveTime = aa.EffectiveTime
            //}).ToList();



        }


    }
}
