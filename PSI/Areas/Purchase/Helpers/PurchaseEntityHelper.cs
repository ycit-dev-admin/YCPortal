using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Core.Entities;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Areas.Purchase.Helpers
{
    public class PurchaseEntityHelper
    {
        private readonly IMapper _mapper;
        private PurchasePriceHelper _purchasePriceHelper;
        public PurchaseEntityHelper(IMapper mapper)
        {
            _purchasePriceHelper = new PurchasePriceHelper();
            _mapper = mapper;
        }

        public PurchaseWeightNote GetPurchaseWeightNote_Create(VE_PurchaseWeightNote vmPurchaseWeightNote, string docNo)
        {
            var purchaseWeightNote = _mapper.Map<PurchaseWeightNote>(vmPurchaseWeightNote);
            purchaseWeightNote.DocNo = docNo;
            purchaseWeightNote.WeightPrice = _purchasePriceHelper.GetWeightNotePrice(
                purchaseWeightNote.FullWeight,
                purchaseWeightNote.DefectiveWeight,
                purchaseWeightNote.UnitPrice,
                purchaseWeightNote.HasTax);
            purchaseWeightNote.DeliveryFee = _purchasePriceHelper.GetDeliveryPrice(
                purchaseWeightNote.FullWeight,
                purchaseWeightNote.TraficUnitPrice.Value);
            purchaseWeightNote.ActualPrice = _purchasePriceHelper.GetActualPayPrice(
               purchaseWeightNote.ThirdWeightFee,
               purchaseWeightNote.WeightPrice.Value,
               purchaseWeightNote.DeliveryFee);

            return purchaseWeightNote;
        }



    }
}
