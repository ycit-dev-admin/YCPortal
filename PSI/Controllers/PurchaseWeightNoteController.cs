﻿using FluentValidation;
using FluentValidation.AspNetCore;
using FormHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Entities;
using PSI.Service.IService;
using PSI.VM_Models;
using PSI.VM_Models.PurchaseWeightNote;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace PSI.Controllers
{
    public class PurchaseWeightNoteController : Controller
    {
        private readonly IPsiService _psiService;
        private readonly ICustomerService _customerService;
        private readonly IProductItemService _productItemService;
        //private readonly IValidator<VM_PurchaseWeightNote> _haha;


        public PurchaseWeightNoteController(IPsiService psiService,
                                            ICustomerService customerService,
                                            IProductItemService productItemService)
        {
            _psiService = psiService;
            _customerService = customerService;
            _productItemService = productItemService;
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

            var customerInfoItems = _customerService.GetCustomerInfosByPsiType("1").Select(aa => new SelectListItem
            {
                Text = aa.CustomerName,
                Value = aa.Id.ToString()
            });
            var productItemItems = _productItemService.GetProductItemsByPsiType("1").Select(aa => new SelectListItem
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
            var haha = _psiService.GetAllPurchaseWeigntNotes();
            var abc = haha.ToList();
            ViewData["Title"] = "當月磅單查詢";
            return View(abc);
        }

        [HttpPost]
        [FormValidator]
        public IActionResult Create(VM_PurchaseWeightNote purchaseWeightNote)
        {

            //var validator = new VM_PurchaseWeightNoteValidator();
            //var validRs = validator.Validate(purchaseWeightNote, options => options.IncludeRuleSets("Create"));

            //var hihi = new VM_PurchaseWeightNote();
            //vr book = JsonSerializer.Deserialize<List<TestABC>>(purchaseWeightNote.Wowgogo);

            if (!ModelState.IsValid)
            { // re-render the view when validation failed.
                return View(purchaseWeightNote);
            }

            var purchaseWeightNote2 = new PurchaseWeightNote
            {
                CarNo = "ABC-123",
                FullWeight = 123,
                FullWeightTime = DateTime.Now,
                DefectiveWeight = 1,
                ExcavatorOpTime = DateTime.Now,
                CarWeight = 10,
                CarWeightTime = DateTime.Now,
                TradeWeight = 100,
                FinalDefectiveWeight = 99,
                UnitPrice = 1,
                WantPrice = 2,
                HasTax = true,
                ActualPrice = 90,
                ThirdWeightFee = 3,
                TraficFee = 5,
                CustomerId = 1,
                EffectiveTime = DateTime.Now,
            };
            _psiService.CreatePurchaseWeightNote(purchaseWeightNote2);
            return PartialView("_CreatePurchaseDocPartial");
        }
    }
}
