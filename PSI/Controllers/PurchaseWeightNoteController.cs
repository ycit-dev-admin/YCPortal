using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PSI.Core.Entities;
using PSI.Infrastructure.Extensions.VM_Model;
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
        private readonly IMapper _mapper;


        public PurchaseWeightNoteController(IMapper mapper,
                                            IPsiService psiService,
                                            ICustomerService customerService,
                                            IProductItemService productItemService,
                                            IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
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
            // string host = _httpContextAccessor.HttpContext.Request.Host.Value;  //能夠取得Host Domain Name





            var vmPurchaseWeightNote = new VM_PurchaseWeightNote();
            vmPurchaseWeightNote.SetCustomerInfoItems(_customerService);
            vmPurchaseWeightNote.SetProductItems(_productItemService);

            return View(vmPurchaseWeightNote);
        }
        [HttpPost]
        public IActionResult Create(VM_PurchaseWeightNote vmPurchaseWeightNote)
        {
            if (ModelState.IsValid)
            {
                // 磅單
                var purchaseWeightNote = _mapper.Map<PurchaseWeightNote>(vmPurchaseWeightNote);


                // 車牌

                // 品項

                // 合約

                // 進貨磅單

                // 磅單也許要區分廠區


            }



            return View(vmPurchaseWeightNote);


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
        public IActionResult CurMonthList()
        {
            var curMonthPWeightNotes = _psiService.GetAllPurchaseWeightNotes();

            var vmModel = _mapper.Map<List<VM_PurchaseWeightNote>>(curMonthPWeightNotes);

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
            return View(vmModel);
        }


    }
}
