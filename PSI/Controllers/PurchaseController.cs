using System.Collections.Generic;
using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PSI.Core.Entities.Identity;
using PSI.Infrastructure.Helpers;
using PSI.Models.PageModels;
using PSI.Models.VEModels;
using PSI.Service.IService;
using static PSI.Core.Enums.PSIEnum;

namespace PSI.Controllers
{
    public class PurchaseController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPsiService _psiService;
        private readonly ICustomerService _customerService;
        private readonly IProductItemService _productItemService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly PurchaseHelper _purchaseHelper;


        public PurchaseController(IMapper mapper,
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



            var pageModel = new Page_Purchase_Create
            {
                CustomerInfoItems = _purchaseHelper.PageGetCustomerInfoItems(_customerService),
                ProductItemItems = _purchaseHelper.PageGetProductItems(_productItemService),
                PsiTypeItems = _purchaseHelper.PageGetPsiTypeItems(_psiService)
            };



            return View(pageModel);
        }
        [HttpPost]
        [Authorize()]
        public IActionResult CreateWeightNote(Page_Purchase_Create pageModel)
        {
            //var validator = new VM_PurchaseWeightNoteValidator();
            //var validRs = validator.Validate(vmPurchaseWeightNote);

            //var validRs = validator.Validate(vmPurchaseWeightNote, options => options.IncludeRuleSets("Create"));
            if (ModelState.IsValid)
            {
                var purchaseHelper = new PurchaseHelper(_mapper);

                var userInfo = _userManager.GetUserAsync(User).Result;
                var docNo = _psiService.GetDocNo(userInfo.FacSite, (int)PSIType.Purchase);
                var purchaseWeightNote = purchaseHelper.GetPurchaseWeightNote(pageModel.VE_PurchaseWeightNote, docNo);  // 磅單
                var vePurchaseIngredientLs = JsonSerializer.Deserialize<List<VE_PurchaseIngredient>>(pageModel.SelectPurchaseDetailInfos);
                var purchaseIngredientLs = purchaseHelper.GetPurchaseIngredientLs(vePurchaseIngredientLs); // 進貨品項

                var createRs = _psiService.CreatePurchaseWeightNote(
                    purchaseWeightNote,
                    purchaseIngredientLs,
                    userInfo);



                if (createRs.Success)
                    return RedirectToAction("CurMonthList");

                TempData["pageMsg"] = createRs.ActionMessage;



            }

            pageModel.CustomerInfoItems = _purchaseHelper.PageGetCustomerInfoItems(_customerService);
            pageModel.ProductItemItems = _purchaseHelper.PageGetProductItems(_productItemService);
            return View(pageModel);


            // 車牌

            // 品項

            // 合約

            // 進貨磅單

            // 磅單也許要區分廠區

            //var validator = new VM_PurchaseWeightNoteValidator();
            //var validRs = validator.Validate(purchaseWeightNote, options => options.IncludeRuleSets("Create"));

            //var hihi = new VM_PurchaseWeightNote();
            //vr book = JsonSerializer.Deserialize<List<TestABC>>(purchaseWeightNote.Wowgogo);







            // return (IActionResult)purchaseWeightNote2;
            //return _psiService.CreatePurchaseWeightNote(purchaseWeightNote2) ?
            //                   FormResult.CreateSuccessResult("建立成功", Url.Action("CurMonthList", "PurchaseWeightNote")) :
            //                   FormResult.CreateErrorResult("錯誤發生");
        }

        [HttpGet]
        [Authorize()]
        public IActionResult WeightNoteList()
        {
            var curMonthPWeightNotes = _psiService.GetAllPurchaseWeightNotes();

            var pageModel = new Page_Purchase_WeightNoteList
            {
                VE_PurchaseWeightNoteLs = _mapper.Map<List<VE_PurchaseWeightNote>>(curMonthPWeightNotes),
                CustomerInfoItems = _purchaseHelper.PageGetCustomerInfoItems(_customerService),
                ProductItemItems = _purchaseHelper.PageGetProductItems(_productItemService)

            };


            pageModel.ProductItemItems = _purchaseHelper.PageGetProductItems(_productItemService);
            pageModel.PsiTypeItems = _purchaseHelper.PageGetPsiTypeItems(_psiService);


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


            ViewData["Title"] = "當月磅單查詢";
            return View(pageModel);
        }


    }
}
