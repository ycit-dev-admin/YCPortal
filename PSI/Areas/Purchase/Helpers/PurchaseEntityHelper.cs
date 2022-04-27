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
            purchaseWeightNote.DOC_NO = docNo;
            purchaseWeightNote.WEIGHT_PRICE = _purchasePriceHelper.GetWeightNotePrice(
                purchaseWeightNote.FULL_WEIGHT,
                purchaseWeightNote.DEFECTIVE_WEIGHT,
                purchaseWeightNote.UNIT_PRICE,
                purchaseWeightNote.HAS_TAX);
            purchaseWeightNote.DELIVERY_FEE = _purchasePriceHelper.GetDeliveryPrice(
                purchaseWeightNote.FULL_WEIGHT,
                purchaseWeightNote.TRAFIC_UNIT_PRICE.Value);
            purchaseWeightNote.ACTUAL_PRICE = _purchasePriceHelper.GetActualPayPrice(
               purchaseWeightNote.THIRD_WEIGHT_FEE,
               purchaseWeightNote.WEIGHT_PRICE.Value,
               purchaseWeightNote.DELIVERY_FEE);

            return purchaseWeightNote;
        }



    }
}
