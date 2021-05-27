using FormHelper;
using Microsoft.AspNetCore.Mvc;
using PSI.Core.Entities;
using PSI.Service.IService;
using PSI.VM_Models;
using PSI.VM_Models.PurchaseWeightNote;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSI.Controllers
{
    public class PurchaseWeightNoteController : Controller
    {
        private readonly IPsiService _psiService;

        public PurchaseWeightNoteController(IPsiService psiService)
        {
            _psiService = psiService;
        }


        //[HttpGet]
        //public IActionResult Create()
        //{
        //    return PartialView("_CreatePurchaseDocPartial");
        //}


        [HttpGet]
        public IActionResult CreatePurchaseWeightNote()
        {
            return View("CreatePurchaseWeightNote");
        }

        [HttpPost, FormValidator]
        public IActionResult Create(VM_PurchaseWeightNote purchaseWeightNote)
        {
            // var validator = new VM_PurchaseWeightNoteValidator();
            var hihi = new VM_PurchaseWeightNote();

            if (!ModelState.IsValid)
            { // re-render the view when validation failed.
                return PartialView("_CreatePurchaseDocPartial", purchaseWeightNote);
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
            return PartialView("_CreatePurchaseDocPartial", hihi);
        }
    }
}
