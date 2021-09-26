using System;
using System.Linq;
using FormHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Entities;
using PSI.Models.PurchaseWeightNote;
using PSI.Service.IService;

namespace PSI.Controllers
{
    public class PurchaseWeightNoteController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPsiService _psiService;
        private readonly ICustomerService _customerService;
        private readonly IProductItemService _productItemService;
        //private readonly IValidator<VM_PurchaseWeightNote> _haha;


        public PurchaseWeightNoteController(IPsiService psiService,
                                            ICustomerService customerService,
                                            IProductItemService productItemService,
                                            IHttpContextAccessor httpContextAccessor)
        {
            _psiService = psiService;
            _customerService = customerService;
            _productItemService = productItemService;
            _httpContextAccessor = httpContextAccessor;
            //_haha = haha;
        }


        //[HttpGet]
        //public IActionResult Create()
        //{
        //    return PartialView("_CreatePurchaseDocPartial");
        //}


        [HttpGet]
        // [RuleSetForClientSideMessages("Skip")]
        public IActionResult Create()
        {
            ViewData["Title"] = "進貨磅單建立";
            string host = _httpContextAccessor.HttpContext.Request.Host.Value;
            var customerInfoItems = _customerService.GetCustomerInfosByPsiType("1").Select(aa => new SelectListItem
            {
                Text = aa.CustomerName,
                Value = aa.Id.ToString()
            });
            var productItemItems = _productItemService.GetPurchaseProductItems().Select(aa => new SelectListItem
            {
                Text = aa.ProductName,
                Value = aa.Id.ToString()
            });


            var vmPurchaseWeightNote = new VM_PurchaseWeightNote
            {
                CustomerInfoItems = customerInfoItems.ToList(),
                ProductItemItems = productItemItems.ToList()

            };
            return View(vmPurchaseWeightNote);
        }

        [HttpGet]
        public IActionResult CurMonthList()
        {
            var curMonthPWeightNotes = _psiService.GetAllPurchaseWeightNotes();
            var vmModel = curMonthPWeightNotes.Select(aa => new VM_PurchaseWeightNote
            {
                CarNoName = aa.CarNo,
                TradeWeight = aa.TradeWeight,
                UnitPrice = aa.UnitPrice.ToString(),
                ActualPrice = aa.ActualPrice,
                DefectiveWeight = aa.DefectiveWeight.ToString(),
                PayType = aa.PayType,
                CreateEmpNo = aa.CreateEmpNo,
                Remark = aa.Remark,
                EffectiveTime = aa.EffectiveTime
            }).ToList();


            ViewData["Title"] = "當月磅單查詢";
            return View(vmModel);
        }

        [HttpPost, FormValidator]
        public IActionResult Create(VM_PurchaseWeightNote purchaseWeightNote)
        {

            //var validator = new VM_PurchaseWeightNoteValidator();
            //var validRs = validator.Validate(purchaseWeightNote, options => options.IncludeRuleSets("Create"));

            //var hihi = new VM_PurchaseWeightNote();
            //vr book = JsonSerializer.Deserialize<List<TestABC>>(purchaseWeightNote.Wowgogo);

            if (!ModelState.IsValid)
            { // re-render the view when validation failed.
                // return View(purchaseWeightNote);
                return FormResult.CreateWarningResult("'Abc' is already exist in the database.");
            }



            var purchaseWeightNote2 = new PurchaseWeightNote
            {
                CarNo = purchaseWeightNote.CarNoName,
                FullWeight = double.Parse(purchaseWeightNote.FullWeight),
                FullWeightTime = purchaseWeightNote.FullWeightTime.Value,
                DefectiveWeight = double.Parse(purchaseWeightNote.DefectiveWeight),
                ExcavatorOpTime = DateTime.Now,
                CarWeight = double.Parse(purchaseWeightNote.FullWeight),
                CarWeightTime = DateTime.Now,
                TradeWeight = double.Parse(purchaseWeightNote.DefectiveWeight),
                FinalDefectiveWeight = double.Parse(purchaseWeightNote.FullWeight),
                UnitPrice = 1,
                WantPrice = 2,
                HasTax = true,
                ActualPrice = 90,
                ThirdWeightFee = 3,
                TraficFee = 5,
                CustomerId = 1,
                EffectiveTime = DateTime.Now,
            };

            return _psiService.CreatePurchaseWeightNote(purchaseWeightNote2) ?
                               FormResult.CreateSuccessResult("建立成功", Url.Action("CurMonthList", "PurchaseWeightNote")) :
                               FormResult.CreateErrorResult("錯誤發生");
        }
    }
}
